import React from 'react';
import { Menu } from 'antd';
import { FolderViewOutlined, VideoCameraOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Spin, Button } from 'antd';

const { SubMenu } = Menu;

class Sider extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      theme: 'light',
      current: 'dashboard',
      error: null,
      isLoaded: false,
      data: null
    };
    this.fetchCams = this.fetchCams.bind(this)
  }

  changeTheme = value => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    }); 
    this.props.onChangeSelected(e.key)
  };

  fetchCams() {
    this.setState({
      isLoaded: false,
      data: null,
      error: null
    })
    console.log("Fetching")
    fetch("http://localhost:5510/api/list")
      .then(res => res.json())
      .then(
          (res) => {
              this.setState({
                  isLoaded: true,
                  data: res.data
              });
          },
          (error) => {
              this.setState({
              isLoaded: true,
              error
              });
          }
      )

  }

  componentDidMount() {
    this.fetchCams();
  }

  render() {
    const { error, isLoaded } = this.state;
    var camList = "Error";
    if (error) {
        camList = (<div style={{marginLeft: 32}}>Error: {error.message} <Button size="small" onClick={this.fetchCams}>Retry</Button></div>);
    } else if (!isLoaded) {
        camList = (<Spin style={{marginLeft: '40%'}}/>);
    } else {
        camList = (
          <>
            {this.state.data.map(item => (
              <Menu.Item key={`cam-${item.node_id}`}>{`${item.name} (${item.node_id})`}</Menu.Item>
            ))}
          </>
        );
    }
  

    return (
      <>
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          defaultOpenKeys={['info', 'cameras', "views"]}
          style={{ width: 256, height: "100vh", overflow: "auto" }}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
        <SubMenu key="info" icon={<InfoCircleOutlined />} title="Info">
            <Menu.Item key="dashboard">Dashboard</Menu.Item>
            <Menu.Item key="settings">Settings</Menu.Item>
          </SubMenu>

          <SubMenu key="cameras" icon={<VideoCameraOutlined />} title={`Cameras (${isLoaded && !error ? this.state.data.length : "?"})`}>
                {camList}
          </SubMenu>
          <SubMenu key="views" icon={<FolderViewOutlined />} title="Views">
            <Menu.Item key="simple">Simplified View</Menu.Item>
            <Menu.Item key="storefront">Storefront View</Menu.Item>
          </SubMenu>
        </Menu>
      </>
    );
  }
}


export default Sider;