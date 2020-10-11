import React from 'react';
import { PageHeader, Spin } from 'antd';
import { Collapse } from 'antd';

const { Panel } = Collapse;


class Camera extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          data: []
        };
    }

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
                {comp}
            </>
        );
    }
}
export default Camera;
