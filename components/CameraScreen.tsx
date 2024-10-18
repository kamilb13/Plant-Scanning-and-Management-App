import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import {useRef, useState} from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native';
import PlantInfo from "./PlantInfo";

const CameraScreen = () => {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState<string | null>(null);
    const cameraRef = useRef<CameraView>(null); // Referencja do kamery
    const [cameraVisible, setCameraVisible] = useState(true);
    const [plantData, setPlantData] = useState<{ name: string; probability: number } | null>(null);

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

    async function takePhoto() {
        if (cameraRef.current) {
            const options = { quality: 1, base64: true }; // Opcje zdjęcia
            const newPhoto = await cameraRef.current.takePictureAsync(options);
            setPhoto(newPhoto.base64);
            setCameraVisible(false);

            const apiResponse = await sendPhotoToApi(newPhoto.base64);

            if (apiResponse) {
                console.log("Odpowiedź z API:", apiResponse);

                const isPlant = apiResponse.result.is_plant;
                if (isPlant.binary) {
                    const suggestions = apiResponse.result.classification.suggestions;

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
        const apiUrl = '...';
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

            const data = await response.json();
            return data;
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
});

export default CameraScreen;
