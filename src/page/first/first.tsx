import * as React from 'react';
import useBanlan from '../components/useBanlan';
import './style.scss';
import Button from '../../components/Button/button';
import Alert from '../../components/Alert/alert';
import { ExclamationOutlined } from '@ant-design/icons';
import Menu from '../../components/Menu/menu';
import MenuItem from '../../components/Menu/menu-item';
import Submenu from '../../components/Menu/submenu';
import Tabs from '../../components/Tabs/tabs';
import TabItem from '../../components/Tabs/tab-item';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../components/Icon/icon';
library.add(fas);
let ar: string;

interface getName {
  name?: string;
  people?: string;
}

interface getAge extends getName {
  age: Number;
  isVoild: boolean;
}

const First: React.FC<getName> = (props) => {
  const { name, people } = props;
  const message: getAge = {
    age: 12,
    isVoild: true
  };
  return (
    <div className="content">
      <Menu defaultIndex={'0'} onSelect={(e) => console.log(e)} mode="vertical">
        <MenuItem>111</MenuItem>
        <MenuItem>222</MenuItem>
        <MenuItem>333</MenuItem>
        <Submenu title="444">
          <MenuItem>222</MenuItem>
          <MenuItem>333</MenuItem>
        </Submenu>
      </Menu>

      <Tabs mode="card">
        <TabItem title="first">
          <Alert title="第一个alert" showIcon alertType="success" />
          <Alert title="第2个alert" showIcon alertType="danger" />
          <Alert title="第3个alert" alertType="warning" />
          <Alert title="第4个alert" showIcon alertType="default" />
        </TabItem>
        <TabItem title="sconde">
          <Icon icon="coffee" theme="success" />
          <Alert title="第5个alert" showIcon alertType="default" showClose description="这是一段描述" />
          <Alert
            title="第6个alert"
            showIcon
            alertType="success"
            showClose
            onClose={() => console.log(13221321)}
            closeBtn="关闭"
            description="这是一段描述"
          />
          <Alert
            title="第6个alert"
            showIcon
            alertType="danger"
            showClose
            closeBtn={<ExclamationOutlined />}
            description="这是一段描述"
          />
        </TabItem>
        <TabItem title="third">
          <Alert title="第7个alert" showIcon alertType="warning" description="这是一段描述" />
          <button>点击</button>
          <Button>113</Button>
          <Button btnType="primary" size="lg">
            primary
          </Button>
          <Button btnType="danger" size="sm" onClick={() => alert(123)}>
            danger
          </Button>
          <Button>default</Button>
          <Button btnType="link" href="https://www.baidu.com">
            link
          </Button>
          <Button btnType="link" disabled href="https://www.baidu.com">
            link
          </Button>
        </TabItem>
      </Tabs>
    </div>
  );
};
First.defaultProps = {
  name: '你是空 你是空 你是空空的空空',
  people: '1231'
};
export default First;
