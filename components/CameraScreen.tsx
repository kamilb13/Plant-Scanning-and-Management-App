import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import {useRef, useState} from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native';

const CameraScreen = () => {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState<string | null>(null);
    const cameraRef = useRef<CameraView>(null); // Referencja do kamery
    const [cameraVisible, setCameraVisible] = useState(true);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
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
            setPhoto(newPhoto.base64); // Zapisz zrobione zdjęcie w stanie
            setCameraVisible(false);
        }
    }

    const resetPhoto = () => {
        setCameraVisible(true);
        setPhoto(null);
    };


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
                    <Button title={"Retake"} onPress={resetPhoto}/>
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
        width: '80%', // Ustal szerokość kamery na 80% ekranu
        height: '50%', // Ustal wysokość kamery na 50% ekranu
        alignSelf: 'center', // Wyrównaj kamerę na środku
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
        justifyContent: 'space-between', // Rozmieść przyciski
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
        width: '80%', // Ustal szerokość podglądu zdjęcia
        height: 300, // Ustal wysokość podglądu zdjęcia
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10, // Zaokrąglij rogi podglądu zdjęcia
    },
});

export default CameraScreen;
