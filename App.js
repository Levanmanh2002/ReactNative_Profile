import React, {useState} from "react";
import {
  View, 
  Text, 
  StyleSheet, 
  StatusBar, 
  TextInput, 
  Pressable,
  Image,
  Keyboard,
  
} from 'react-native';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      githubData: null,
    }
  }

  handleTextChange = text => {
    this.setState({text});
  };

  onClick = () => {
    Keyboard.dismiss();
    return fetch('https://api.github.com/user/' + this.state.text)
    .then(response => response.json())
    .then(data => {
      console.log(JSON.stringify(data, null, 2));
      this.setState({githubData: data});
    });
  };

  render(){
    const {githubData} = this.state;
    return (
      <>
      <StatusBar hidden />
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Github Profile</Text>
            <View style={styles.from}>
              <TextInput 
                value={this.state.text}
                style={styles.input} 
                onChangeText={this.handleTextChange}
                placeholder="Type username" 
              />
              <Pressable onPress={this.onClick} style={styles.button}>
                <Text style={styles.buttonTitle}>Fetch</Text>
              </Pressable>
            </View>
          </View>

            <View style={styles.infoContainer}>
              <Image 
                style={styles.avatar} 
                source={
                  githubData?.avatar_url
                    ? {uri: githubData?.avatar_url}
                    :require('./imgreact-nativr.jpg')
                  }
              />
              <Text style={styles.fullName}>{githubData?.name || ''}Lê Văn Mạnh</Text>
              <Text style={styles.username}>@{githubData?.login || ''}username</Text>
            </View>
            <View style={styles.flowContainer}>
              <View>
                <Text style={styles.flowTitle}>Followers</Text>
                <Text style={styles.flowCount}>{githubData?.followers || 0}</Text>
              </View>
              <View>
                <Text style={styles.flowTitle}>Following</Text>
                <Text style={styles.flowCount}>{githubData?.following || 0}</Text>
              </View>
            </View>
        </View>
      </>
    )
  }
}


// const App2 = () => {
//   const [text, setText] = useState('');
//   const [githubData, setGithubData] = useState (null);

//   const onClick = () => {
//     Keyboard.dismiss();
//     return fetch('https://api.github.com/user/' +text)
//     .then(response => response.json())
//     .then(data => {
//       console.log(JSON.stringify(data, null, 2));
//       setGithubData(data);
//     });
//   };

//   return (
//   <>
//     <StatusBar hidden />
//       <View style={styles.container}>
//         <View>
//           <Text style={styles.title}>Github Profile</Text>
//           <View style={styles.from}>
//             <TextInput 
//               value={text}
//               style={styles.input} 
//               onChangeText={setText}
//               placeholder="Type username" 
//             />
//             <Pressable onPress={onClick} style={styles.button}>
//               <Text style={styles.buttonTitle}>Fetch</Text>
//             </Pressable>
//           </View>
//         </View>

//           <View style={styles.infoContainer}>
//             <Image 
//               style={styles.avatar} 
//               source={
//                 githubData?.avatar_url
//                   ? {uri: githubData?.avatar_url}
//                   :require('./avatar.jpg')
//                 }
//             />
//             <Text style={styles.fullName}>{githubData?.name || ''}Lê Văn Mạnh</Text>
//             <Text style={styles.username}>@{githubData?.login || ''}username</Text>
//           </View>
//           <View style={styles.flowContainer}>
//             <View>
//               <Text style={styles.flowTitle}>Followers</Text>
//               <Text style={styles.flowCount}>{githubData?.followers || 0}</Text>
//             </View>
//             <View>
//               <Text style={styles.flowTitle}>Following</Text>
//               <Text style={styles.flowCount}>{githubData?.following || 0}</Text>
//             </View>
//           </View>
//       </View>
//     </>
//   );
// };


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#202124',
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  from: {
    flexDirection: 'row',
  },
  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#C4C4C4',
    borderRadius: 10,
    fontSize: 20,
    // paddingLeft: 20,
    // paddingRight: 20,
    // có thể thay bằng paddingHorizontal
    paddingHorizontal: 20,
    // paddingTop: 10,
    // paddingBottom: 10,
    // có thể thay bằng paddingVertical 
    paddingVertical: 10,
    flex: 1,
  }, 
  button: {
    backgroundColor: '#3F8AFA',
    borderRadius: 10,
    marginLeft: 10,
    fontSize: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  buttonTitle: {
    fontSize: 20,
    color: '#fff',
  },
  avatar: {
    width: 138,
    height: 138,
    borderRadius: 138/2,
  },
  fullName: {
    color: '#fff',
    fontSize: 28,
  },
  username: {
    color: '#2C8FE6',
    fontSize: 20,
  },
  infoContainer: {
    alignItems: 'center',
  },
  flowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flowTitle: {
    color: '#fff',
    fontSize: 24,
  },
  flowCount: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default App;