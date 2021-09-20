import * as React from 'react';
import { Text, View, StyleSheet, FlatList, Pressable, Image,Modal } from 'react-native';
import Constants from 'expo-constants';

async function executeGet(url,jsonState){
  await fetch(url)
  .then(response => {
        if (response.status === 200) {
          console.log('Requisição executa com sucesso!');
          response.json().then(function(result){ 
            jsonState(result)
            });
        } else {
          throw new Error('Erro ao consumir a API!');
        }
    })
    .then(response => {
      console.debug(response);
    }).catch(error => {
      console.error(error);
    });
}

const ShowDetalhes = ({display,toogleModal,mensagem}) => (   
  <Modal
        animationType="slide"
        transparent={true}
        visible={display}
        onRequestClose={toogleModal}
  >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
              <Pressable onPress={toogleModal}>
                <Text>Titulo da Foto:</Text>
                <Text>{mensagem}</Text>
              </Pressable>
        </View>
      </View>    
  </Modal>        
)

const Foto = ({albumId, id, title, url}) => {    
    const [modal,setModal] = React.useState(false)
    function mudaModal(){
      setModal(!modal)
    }

    return(
    <View>
      <ShowDetalhes display={modal} toogleModal={mudaModal} mensagem={title}/>      
      <Pressable onPress={mudaModal}>      
        <Text style={styles.paragraph}>Id Foto:{albumId}</Text>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: url,
          }}
        />
        <Text style={styles.paragraph}>{title}</Text>
      </Pressable>
   
    <View
        style={{
          marginTop:20,
          borderBottomColor: '#50fa7b',
          borderBottomWidth: 1,
        }}
      />
    </View>
    )
}

export default function App() {
  const [jsonData,setJsonData] = React.useState({})
  executeGet("https://jsonplaceholder.typicode.com/photos",setJsonData)
  function meuItem({item}){    
    return(
      <Foto albumId={item.albumId} 
              id={item.id}
              title={item.title}
              url = {item.url}
      />
    )
  }  

  return (
    <View style={styles.container}>
      <FlatList
        data={jsonData}
        renderItem={meuItem}
        keyExtractor={item => item.id}
      />      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  paragraph: {
    padding: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'gray',
    borderBottomColor: 'black',
    borderWidth: 2,
  },
  tinyLogo: {
    width: 400,
    height: 200,
    alignSelf: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: "black",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});