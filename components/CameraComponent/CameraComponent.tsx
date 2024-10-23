import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import {useContext, useEffect, useRef, useState} from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native';
import PlantInfo from "../PlantInfoComponent/PlantInfo";
import {AuthContext} from "../../contexts/AuthContext/AuthContext";
import * as FileSystem from 'expo-file-system';
import {PlantDataContext} from "../../contexts/PlantDataContext/PlantDataContext";
const CameraComponent = () => {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState<string | null>(null);
    const cameraRef = useRef<CameraView>(null);
    const [cameraVisible, setCameraVisible] = useState(true);
    const [plantData, setPlantData] = useState<{ name: string; probability: number } | null>(null);
    const { addPlant } = useContext(PlantDataContext);
    const [id, setId] = useState(0)

    const savePlantData = () => {
        if (plantData) {
            setId(id + 1);
            //addPlant(id, plantData);
            addPlant({id, ...plantData})
        }
    };
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

    function toggleCameraFacing() {
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
    async function takePhoto() {
        if (cameraRef.current) {
            const options = { quality: 1, base64: true };
            const newPhoto = await cameraRef.current.takePictureAsync(options);
            setPhoto(newPhoto.base64);
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
                        setPlantData({ name: firstSuggestion.name, probability: firstSuggestion.probability });
                    } else {
                        alert("Brak sugestii rozpoznania rośliny.");
                    }
                } else {
                    alert("To nie jest roślina.");
                }
            }
        }
    }


    const resetPhoto = () => {
        setCameraVisible(true);
        setPhoto(null);
    };

    async function sendPhotoToApi(photoBase64: string) {
        const apiUrl = 'https://plant.id/api/v3/identification';
        const apiKey = '...';

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

            //const data = await response.json();
            return await response.json();
        } catch (error) {
            console.error("Błąd podczas wysyłania zdjęcia do API", error);
            return null;
        }
    }


    console.log(cameraVisible)
    return (
        <View style={styles.container}>


            {cameraVisible ? (
                <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                            <Text style={styles.text}>Flip Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={takePhoto}>
                            <Text style={styles.text}>Take Photo</Text>
                        </TouchableOpacity>
                    </View>
                </CameraView>

            ) : (
                <View>
                    {photo && (
                        <Image
                            source={{ uri: `data:image/jpg;base64,${photo}` }}
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
                        <Text style={styles.addPlantButtonText}>Dodaj roślinę do bazy</Text>
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
        width: '80%',
        height: '50%',
        alignSelf: 'center',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
        justifyContent: 'space-between',
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
        width: 300,
        height: 300,
        alignSelf: 'center',
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