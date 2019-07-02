import React, { Component } from 'react';
import {
    Tabs,
    Layout,
    Menu,
    Card,
    Button,
    Divider,
    Tree,
    Input,
    Form,
    message,
    Spin,
    Select,
} from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import MonitorContent from '@/components/MonitorContent/index';
import SdlForm from "../AutoFormManager/SdlForm"
const Search = Input.Search;
const { Option } = Select;

@connect(({ userinfo, loading }) => ({

}))
@Form.create()
export default class UserInfoAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }
    onChange = (value) => {
        console.log(`selected ${value}`);
    }

    onBlur = () => {
        console.log('blur');
    }

    onFocus = () => {
        console.log('focus');
    }

    onSearch = (val) => {
        console.log('search:', val);
    }

    componentDidMount() {

    }


    render() {

        return (
            <MonitorContent
                {...this.props}
                breadCrumbList={
                    [
                        { Name: '首页', Url: '/' },
                        { Name: '角色管理', Url: '/sysmanage/roleindex/' },
                        { Name: '分配权限', Url: '' },
                    ]
                }
            >
                <div style={{ width: '100%', height: 'calc(100vh - 500px)', background: '#fff' }}>
                    {
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="请选择系统"
                            optionFilterProp="children"
                            onChange={this.onChange}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            onSearch={this.onSearch}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {this.props.attentionOptions.map((item, key) => (<Option key={item.AttentionCode}>{item.AttentionName}</Option>))
                            }
                        </Select>
                    }

                </div>
            </MonitorContent>
        );
    }
}
