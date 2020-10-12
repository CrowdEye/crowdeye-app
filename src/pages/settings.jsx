import React from "react";
import { Input } from "antd";
import { Button, Row, Col, message } from "antd";

import config from '../config.json';

class Settings extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      loading: false,
      maxValue: undefined
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  
  }
  async handleSubmit(e)  {
    e.preventDefault();
    if (this.state.maxValue === undefined)
    {
      return
    }
      this.setState({
      loading: true
    });

    var formData = new FormData();
    formData.append("max", this.state.maxValue,);

    let res = await fetch(`${config.core_url}/`, {
      method: 'POST',
      body: formData,
    })
    if (!res.ok) {
      alert("HTTP-Error: " + res.status);
    } else {
      message.success('Successfully updated max value');
    }
    
    this.setState({
      loading: false,
      maxValue: undefined
    });

  }
  render() {
    return (
      <Row gutter={16} style={{ marginTop: 32 }}>
        <Col span={8}>
          <form method="POST" onSubmit={this.handleSubmit}>
            <Input value={this.state.maxValue} onChange={function(e){this.setState({maxValue: e.target.value})}.bind(this)} type="number" name="max" placeholder="Maximum number of people in store" />
            <br />
            <br />
            <Button type="submit" loading={this.state.loading} onClick={this.handleSubmit}>Save</Button>
          </form>
        </Col>
      </Row>
    );
  }
}
export default Settings;
