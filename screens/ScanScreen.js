import React from 'react';
import { Text, View, TouchableOpacity,Image , StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            hasCameraPermission: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'
        }
    }


getCameraPermission = async () =>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
       hasCameraPermission: status === 'granted'
    });
}

handleBarCodeScanned = async({type ,data})=>{
    this.setState({
        scanned: true,
        scannedData: data,
        buttonState: 'normal'
    });
}

render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState === "clicked" && hasCameraPermissions){
      return(
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    else if (buttonState === "normal"){
      return(
        <View style={styles.container}>

        <Text style={styles.displayText}>{
          hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permission"
        }</Text>     

        <TouchableOpacity
          onPress={this.getCameraPermissions}
          style={styles.scanButton}
          title = "Bar Cde Scanner">
          <Text style={styles.buttonText}>Scan QR Code</Text>
        </TouchableOpacity>
      </View>
      );
    }
  }

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    displayText:{
        fontSize: 15,
        textDecorationLine: 'underline'
    },
    scannedButton:{
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 10
    }
})