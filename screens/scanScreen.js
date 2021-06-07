import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }

    getCameraPermissions=async()=>{
        const{status}=await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions:status==='granted',
            buttonState:'normal'
        });
    }

    handleBarcodeScanned=async({type,data})=>{
         this.setState({
             scanned:true,
             scannedData:data,
             buttonState:'normal'
         });
    }
    
    render(){
       const hasCameraPermissions= this.state.hasCameraPermissions;
       const scanned= this.state.scanned;
       const buttonState= this.state.buttonState;
       
       
       
       if(buttonState==='clicked'&& hasCameraPermissions){
            return(
                <BarCodeScanner onBarCodeScanned={scanned?undefined:this.handleBarcodeScanned}
                style={StyleSheet.absoluteFillObject}>
                </BarCodeScanner>
            )
        }
        else if(buttonState==='normal'){
            return(
                <View style={styles.Vstyle}>
                    <Image source={
        require('../assets/220px-Barcode-scanner.jpg')
    }
    style={{width:200, height:200}}>

    </Image>
<Text>
    {hasCameraPermissions===true?this.state.scannedData:'request camera permission'}
</Text>
<TouchableOpacity style={styles.TOstyle}
onPress={this.getCameraPermissions}>
    <Text style={styles.Tstyle}>
        Scan QR code
    </Text>
</TouchableOpacity>
                </View>
            )
        }
    }
}

const styles= StyleSheet.create({
    Vstyle:{
        flex:1,
        justifyContent:'center',
        alignSelf:'center'
    },
    Tstyle:{
        fontSize:20,
        textDecorationLine:'underline'
    },
    TOstyle:{
        backgroundColor:'#79c8e8',
        alignSelf:'center',
        padding:10
    }
})