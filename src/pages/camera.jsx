import React from 'react';
import { Modal, Button, PageHeader, Spin, Statistic } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { Collapse, Row } from 'antd';

const { Panel } = Collapse;


class Camera extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          data: [],
          visible: false
        };
    }

    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    handleOk = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
  
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
  

    componentDidMount() {
        fetch(`http://localhost:5510/api/get/${this.props.cameraNodeId}`)
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result)
              this.setState({
                isLoaded: true,
                data: result
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
    componentDidUpdate() {
      fetch(`http://localhost:5510/api/get/${this.props.cameraNodeId}`)
      .then(res => res.json())
      .then(
        (result) => {
            console.log(result)
          this.setState({
            isLoaded: true,
            data: result
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

    moveLine() {
      alert("Click on the first and second point on the image")
    }

    
    render() {
        const { error, isLoaded, data } = this.state;
        var comp = "Error";
        if (error) {
            comp = (<div>Error: {error.message}</div>);
        } else if (!isLoaded) {
            comp = (<Spin size="large" />);
        } else {
            comp = (
                <Collapse ghost>
                    <Panel header="Annoted Stream" key="1">
                        <img src={`http://localhost:5500/stream/${data.node_id}/annotated`} alt="Annoted camera stream"/>
                        <br />
                        <br />
                        <Button onClick={this.showModal}>
                            Move Line
                        </Button>
                    </Panel>
                    <Panel header="Raw Stream" key="2">
                        <img src={data.camera_ip} alt="Camera stream" />
                    </Panel>
                    <Panel header="Actions" key="3">
                        <p>Actions</p>
                    </Panel>
                </Collapse>
            );
        }
    
        return (
            <>
                <PageHeader
                    onBack={() => null}
                    title="Camera"
                    subTitle={`node id: ${this.props.cameraNodeId}`}
                    backIcon={<></>}
                />
                <Statistic style={{marginLeft: 32}} prefix={<UserOutlined />} title="People detected" value={12} />
                {comp}
                <Modal
                  title="Move Line"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  <p>Click on the annoted image twice to move the position of the line</p>
                </Modal>

            </>
        );
    }
}
export default Camera;
