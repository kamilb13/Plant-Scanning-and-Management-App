import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React, {useContext, useRef, useState} from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native';
import PlantInfo from "../PlantInfoComponent/PlantInfo";
import * as ImagePicker from 'expo-image-picker';
import { PLANT_API_KEY } from '@env';
import {PlantDataContext} from "../../contexts/PlantDataContext/PlantDataContext";
import {Ionicons} from "@expo/vector-icons";


const CameraComponent = () => {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState<string | null>(null);
    const cameraRef = useRef<CameraView>(null);
    const [cameraVisible, setCameraVisible] = useState(true);
    const [plantData, setPlantData] = useState<{ name: string; probability: number, photo: string } | null>(null);
    const { addPlant } = useContext(PlantDataContext);
    const [id, setId] = useState(0)

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }
    interface PlantApiResponse {
        result: {
            is_plant: {
                probability: number;
                threshold: number;
                binary: boolean;
            };
            classification: {
                suggestions: {
                    id: string;
                    name: string;
                    probability: number;
                    details: {
                        language: string;
                        entity_id: string;
                    };
                }[];
            };
        };
    }

    const takePhoto = async () => {
        if (cameraRef.current) {
            const options = { quality: 1, base64: true };
            const newPhoto = await cameraRef.current.takePictureAsync(options);
            setPhoto(`data:image/jpg;base64,${newPhoto.base64}`);
            setCameraVisible(false);
            //const apiResponse = await sendPhotoToApi(newPhoto.base64);
            // Testtowy zabieg dla oszczedzania credits z API
            let apiResponse: string = "{\"access_token\":\"vRvwolohK05HagN\",\"model_version\":\"plant_id:4.1.2\",\"custom_id\":null,\"input\":{\"latitude\":null,\"longitude\":null,\"images\":[\"https://plant.id/media/imgs/c3e513ef023e447dbb3d3d00128f3019.jpg\"],\"datetime\":\"2024-10-22T17:41:31.663245+00:00\"},\"result\":{\"is_plant\":{\"probability\":0.9993554,\"threshold\":0.5,\"binary\":true},\"classification\":{\"suggestions\":[{\"id\":\"5851470284ce3834\",\"name\":\"Kalanchoe blossfeldiana\",\"probability\":0.9045,\"details\":{\"language\":\"en\",\"entity_id\":\"5851470284ce3834\"}},{\"id\":\"2b6d180066203936\",\"name\":\"Schlumbergera truncata\",\"probability\":0.0398,\"details\":{\"language\":\"en\",\"entity_id\":\"2b6d180066203936\"}},{\"id\":\"73d08d6ac79df434\",\"name\":\"Ficus\",\"probability\":0.0216,\"details\":{\"language\":\"en\",\"entity_id\":\"73d08d6ac79df434\"}},{\"id\":\"e334e61577ee15a0\",\"name\":\"Crassula\",\"probability\":0.011,\"details\":{\"language\":\"en\",\"entity_id\":\"e334e61577ee15a0\"}}]}},\"status\":\"COMPLETED\",\"sla_compliant_client\":true,\"sla_compliant_system\":true,\"created\":1729618891.663245,\"completed\":1729618892.24605}";

            // Konwertujemy łańcuch tekstowy na obiekt
            const parsedResponse = JSON.parse(apiResponse);


            if (parsedResponse) {
                const isPlant = parsedResponse.result.is_plant;
                if (isPlant.binary) {
                    const suggestions = parsedResponse.result.classification.suggestions;

                    if (Array.isArray(suggestions) && suggestions.length > 0) {
                        const firstSuggestion = suggestions[0];
                        setPlantData({ name: firstSuggestion.name, probability: firstSuggestion.probability, photo: newPhoto.uri });
                    } else {
                        alert("Brak sugestii rozpoznania rośliny.");
                    }
                } else {
                    alert("To nie jest roślina.");
                }
            }
        }
    }

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Proszę o zezwolenie na dostęp do biblioteki zdjęć!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        //console.log(result)
        if (!result.canceled) {
            const selectedPhoto = result.assets[0].uri;
            setPhoto(selectedPhoto);
            setCameraVisible(false);

            // selectedPhoto!!!!
            //const apiResponse = await sendPhotoToApi(newPhoto.base64);

            // Testtowy zabieg dla oszczedzania credits z API
            let apiResponse: string = "{\"access_token\":\"vRvwolohK05HagN\",\"model_version\":\"plant_id:4.1.2\",\"custom_id\":null,\"input\":{\"latitude\":null,\"longitude\":null,\"images\":[\"https://plant.id/media/imgs/c3e513ef023e447dbb3d3d00128f3019.jpg\"],\"datetime\":\"2024-10-22T17:41:31.663245+00:00\"},\"result\":{\"is_plant\":{\"probability\":0.9993554,\"threshold\":0.5,\"binary\":true},\"classification\":{\"suggestions\":[{\"id\":\"5851470284ce3834\",\"name\":\"Kalanchoe blossfeldiana\",\"probability\":0.9045,\"details\":{\"language\":\"en\",\"entity_id\":\"5851470284ce3834\"}},{\"id\":\"2b6d180066203936\",\"name\":\"Schlumbergera truncata\",\"probability\":0.0398,\"details\":{\"language\":\"en\",\"entity_id\":\"2b6d180066203936\"}},{\"id\":\"73d08d6ac79df434\",\"name\":\"Ficus\",\"probability\":0.0216,\"details\":{\"language\":\"en\",\"entity_id\":\"73d08d6ac79df434\"}},{\"id\":\"e334e61577ee15a0\",\"name\":\"Crassula\",\"probability\":0.011,\"details\":{\"language\":\"en\",\"entity_id\":\"e334e61577ee15a0\"}}]}},\"status\":\"COMPLETED\",\"sla_compliant_client\":true,\"sla_compliant_system\":true,\"created\":1729618891.663245,\"completed\":1729618892.24605}";

            // Konwertujemy łańcuch tekstowy na obiekt
            const parsedResponse = JSON.parse(apiResponse);


            if (parsedResponse) {
                const isPlant = parsedResponse.result.is_plant;
                if (isPlant.binary) {
                    const suggestions = parsedResponse.result.classification.suggestions;

                    if (Array.isArray(suggestions) && suggestions.length > 0) {
                        const firstSuggestion = suggestions[0];
                        setPlantData({ name: firstSuggestion.name, probability: firstSuggestion.probability, photo: selectedPhoto });
                    } else {
                        alert("Brak sugestii rozpoznania rośliny.");
                    }
                } else {
                    alert("To nie jest roślina.");
                }
            }
        }
    };

    const resetPhoto = () => {
        setCameraVisible(true);
        setPhoto(null);
    };

    const savePlantData = () => {
        if (plantData) {
            setId(id + 1);
            addPlant({id, ...plantData})
        }
    };

    const sendPhotoToApi = async(photoBase64: string) => {
        const apiUrl = 'https://plant.id/api/v3/identification';
        const apiKey = PLANT_API_KEY;

        const body = {
            images: [`data:image/jpg;base64,${photoBase64}`],
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': apiKey,
                },
                body: JSON.stringify(body),
            });

            return await response.json();
        } catch (error) {
            console.error("Błąd podczas wysyłania zdjęcia do API", error);
            return null;
        }
    }

    return (
        <View style={styles.container}>
            {cameraVisible ? (
                <>
                    <CameraView style={styles.camera} facing={facing} ref={cameraRef}/>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity style={styles.iconButton} onPress={toggleCameraFacing}>
                            <Ionicons name="camera-reverse" size={30} color="#ffffff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={takePhoto}>
                            <Ionicons name="camera" size={30} color="#ffffff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
                            <Ionicons name="image" size={30} color="#ffffff" />
                        </TouchableOpacity>
                    </View>
                </>

            ) : (
                <View>
                    {photo && (
                        <Image
                            key={photo}
                            source={{ uri: photo }}
                            style={styles.preview}
                        />
                    )}
                    {plantData && (
                        <PlantInfo
                            plantName={plantData.name}
                            probability={plantData.probability}
                            onRetake={resetPhoto}
                        />
                    )}
                    <TouchableOpacity style={styles.addPlantButton} onPress={savePlantData}>
                        <Text style={styles.addPlantButtonText}>Add plant to your collection</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
},
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        height: '60%',
        alignSelf: 'center',
        aspectRatio: 1,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    iconButton: {
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: '#333',
        borderRadius: 30,
    },
    button: {
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    preview: {
        height: '60%',
        alignSelf: 'center',
        aspectRatio: 1,
        marginTop: 20,
        borderRadius: 10,
    },
    addPlantButton: {
        padding: 15,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 5,
        backgroundColor: '#4CAF50',
        color: '#FFFFFF',
    },
    addPlantButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default CameraComponent;
