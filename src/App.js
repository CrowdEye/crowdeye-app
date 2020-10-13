import React from 'react';
import './App.css';


import Sidenav from './components/sidenav'
import HeaderNav from './components/header'
import Dashboard from './pages/dashboard'

import Settings from './pages/settings'

import Camera from './pages/camera'

import { Layout, message } from 'antd';


const { Header, Sider, Content } = Layout;


const PAGES = {
  'dashboard': <Dashboard />,
  'settings': <Settings />
}

class App extends React.Component {
  state = {
    theme: 'light',
    comp: "dashboard",
    camera: false,
    camID: null
  };

  changeTheme = value => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  };

  setContent = (to) => {
    if (to.substring(0, 3) === "cam") // Selected tab is a cam
    {
      this.setState({
        comp: to,
        camera: true,
        camID: to.substring(4),
      })
    } else {
      this.setState({
        comp: to,
        camera: false,
        camID: null,
      })
    }
  }



  render() {
    var comp = PAGES[this.state.comp]!== undefined 
                    ? PAGES[this.state.comp] 
                    : `Not Found :(---------${this.state.comp}`
    if (this.state.camera)
    {
      comp = <Camera cameraNodeId={this.state.camID} />
    }
    return (
      <div className="App">
               
      <Layout>  
        <Header><HeaderNav /></Header>
        <Layout>
          <Sider>
            <Sidenav theme={this.state.theme} onChangeSelected={this.setContent} />
          </Sider>
          <Content>
            <div style={{marginLeft: 128}}>
              {comp}
            </div>
          </Content>
        </Layout>
      </Layout>



      </div>
    );
  }
}

export default App;
