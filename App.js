import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';



const App = () => {
  const [launchData, setLaunchData] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [isVisible, setVisible] = useState(false)
  const [modalData, setModalData] = useState({})
  const [loading, setLoading]=useState(false)

  const fetchData = () => {
    setLoading(true)
    axios.get('https://api.spacexdata.com/v3/launches')
      .then(async (res) => {
        // console.log("res",await res.data);
        setLaunchData(await res.data)
        setLoading(false)
      }).catch(error => {
        setLoading(false)
        console.log("Error");
      })
  }

  const fetchLatest = () =>{
    setLoading(true)
    axios.get('https://api.spacexdata.com/v3/launches/latest')
    .then(async (res) => {
      // console.log("res",await res.data);
      setLaunchData(await res.data)
      setLoading(false)
    }).catch(error => {
      setLoading(false)
      console.log("Error");
    })
  }
  const fetchOld = () =>{
    setLoading(true)
    axios.get('https://api.spacexdata.com/v3/launches/past')
    .then(async (res) => {
      // console.log("res",await res.data);
      setLaunchData(await res.data)
      setLoading(false)
    }).catch(error => {
      console.log("Error");
      setLoading(false)
    })
  }
  const fetchNext = () =>{
    setLoading(true)
    axios.get('https://api.spacexdata.com/v3/launches/next')
    .then(async (res) => {
      // console.log("res",await res.data);
      setLaunchData(await res.data)
      setLoading(false)
    }).catch(error => {
      console.log("Error");
      setLoading(false)
    })
  }
  const fetcUpcoming = () =>{
    setLoading(true)
    axios.get('https://api.spacexdata.com/v3/launches/upcoming')
    .then(async (res) => {
      // console.log("res",await res.data);
      setLaunchData(await res.data)
      setLoading(false)
    }).catch(error => {
      console.log("Error");
      setLoading(false)
    })
  }

  // const search=(text)=>{
  //   let filteredArray =launchData.filter((item)=>item.mission_name.includes(text));
  //   // setLaunchData(filteredArray)
  // }
  useEffect(() => {
    fetchData()
  }, [])

  const renderItem = ({ item, index }) => {
    // console.log('item: ', item);
    return (
      <View style={styles.cardStyle}>
        <View style={styles.missionStyle}>
          <Text>Mission Name : </Text>
          <Text>{item.mission_name}</Text>
        </View>
        <View style={styles.missionStyle}>
          <Text>Flight Number : </Text>
          <Text>{item.flight_number}</Text>
        </View>
        <Text style={styles.seeMoreText} onPress={() => {
          setVisible(!isVisible)
          setModalData(item)
        }}> Seen More..</Text>
      </View>
    )
  }
  // console.log("Moda",modalData);

  const ModalRender = () => {

    return (
      <Modal visible={isVisible} onRequestClose={() => {
        setVisible(false)
        setModalData(null)
      }}
        transparent
        style={styles.modalStyle}>
        <View style={styles.middleStyle}>
          <Text style={styles.closeModalText} onPress={() => {
            setVisible(false)
            setModalData(null)
          }}>Close Modal</Text>
          <View style={styles.missionStyle}>
            <Text>Mission Name : </Text>
            <Text>{modalData.mission_name}</Text>
          </View>
          <View style={styles.missionStyle}>
            <Text>Flight Number : </Text>
            <Text>{modalData.flight_number}</Text>
          </View>
          <View>
            <Text>Discription : </Text>
            <Text>{modalData.details}</Text>
          </View>
        </View>


      </Modal>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
    {loading && <ActivityIndicator size={'large'}  style={{alignSelf:"center",top:"50%",zIndex:199}}/>}  
        {/* HEader */}
        <View>
          <TextInput
            style={styles.inputStyle}
            value={searchValue}
            onChange={(e)=>search(e)}
            placeholder='Search here' />
        </View>

        <View style={styles.headerStyle}>
          <Text style={styles.labelText} onPress={()=>fetchData()}>All</Text>
          <Text style={styles.labelText}  onPress={()=>fetchOld()}>Past</Text>
          <Text style={styles.labelText} onPress={()=>fetcUpcoming()}>Upcoming </Text>
          <Text style={styles.labelText} onPress={()=>fetchLatest()}>Latest  </Text>
          <Text style={styles.labelText} onPress={()=>fetchNext()}>Next  </Text>

        </View>
        <FlatList
          data={launchData}
          renderItem={renderItem}></FlatList>
      </View>

      {/* Modal */}
      <ModalRender />
    </SafeAreaView>
  )
}
export default App
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    margin: 10
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  cardStyle: {
    padding: 10,
    marginVertical: 4,
    elevation: 4,
    // borderWidth:0.1,
    borderColor: 'black',
    borderRadius: 20,
    backgroundColor: "#ffffff"
  },
  inputStyle: {
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10
  },
  missionStyle: {
    flexDirection: "row"
  },
  seeMoreText: {
    color: 'blue'
  },
  modalStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // elevation:5
  },
  middleStyle: {
    flex: 0.5,
    backgroundColor: 'white',
    margin: 20,
    elevation: 4,
    borderRadius: 15,
    padding: 20
  },
  closeModalText: {
    color: "red"
  },
  labelText:{
    paddingHorizontal:10,
    marginHorizontal:5,
    paddingVertical:5,
    borderRadius:15,
    borderWidth:1
  },
  headerStyle:{
    flexDirection:"row",
    alignItems:"center",
    width:"28%",
    // justifyContent:"center"
  }

});
