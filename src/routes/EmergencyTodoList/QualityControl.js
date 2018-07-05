import React, { Component } from 'react';
import styles from '../EmergencyTodoList/QualityControl.less';
import {Input, Select, Button} from 'antd';
import EmergencyInfo from '../../mockdata/EmergencyTodoList/EmergencyDetailInfo.json';

const { Option } = Select;
const { TextArea } = Input;
export default class QualityControl extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const SCREEN_HEIGHT = document.querySelector('body').offsetHeight - 150;
        debugger;
        const { emergencyId } = this.props;
        // 气态分析仪运行状况
        const inspectionRecord = EmergencyInfo.InspectionRecord.filter(function(item) {
            return item.ExceptionHandleId === emergencyId;
        });
      
        return (
            <div className={styles.FormDiv} style={{height: SCREEN_HEIGHT}}>
                <table className={styles.FormTable}>
                    <tbody>
                        <tr>
                            <td colSpan="2" rowSpan="3" style={{width: '19%', textAlign: 'left'}}>
    参比法对比测试仪
                            </td>
                            <td>
    仪器名称
                            </td>
                            <td colSpan="3" rowSpan="1" style={{width: '55%'}}>
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].DeviceName} />
                            </td>
                        </tr>
                        <tr>
                            <td style={{width: '19%', textAlign: 'left'}}>
    仪器型号
                            </td>
                            <td colSpan="3" rowSpan="1" style={{width: '62%'}}>
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].DeviceType} />
                            </td>
                        </tr>
                        <tr>
                            <td style={{width: '19%', textAlign: 'left', fontSize: '13px'}}>
    仪器供应商
                            </td>
                            <td colSpan="3" rowSpan="1" style={{width: '62%', textAlign: 'left'}}>
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].DeviceProvider} />
                            </td>
                        </tr>
                        <tr>
                            <td rowSpan="4" style={{width: '12%', textAlign: 'left'}}>
    烟尘比对监测
                            </td>
                            <td style={{width: '19%', textAlign: 'left'}}>
    对比测试仪原理
                            </td>
                            <td colSpan="1" rowSpan="1" style={{width: '25%', textAlign: 'left'}}>
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].Yc_PrincipleOfContrastTester} />
                            </td>
                            <td style={{width: '19%', textAlign: 'left'}}>
    CEMS分析仪原理
                            </td>
                            <td colSpan="1" rowSpan="1" style={{width: '25%', textAlign: 'left'}}>
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].Yc_PrincipleOfCEMSAnalyze} />
                            </td>
                        </tr>
                        <tr>
                            <td>
    参比三次均值 （mg/m3）
                            </td>
                            <td colSpan="1" rowSpan="1">
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].Yc_CbThreeJz} />
                            </td>
                            <td>
    CEMS测定均值（mg/m3）
                            </td>
                            <td colSpan="1" rowSpan="1">
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].Yc_CbCdJz} />
                            </td>
                        </tr>
                        <tr>
                            <td>
    公式
                            </td>
                            <td colSpan="1" rowSpan="1">
                                <Select style={{ width: 120 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].Yc_formula}>
                                    <Option value="相对误差">相对误差</Option>
                                    <Option value="绝对误差">绝对误差</Option>
                                </Select>
                            </td>
                            <td colSpan="1" rowSpan="1">
                                <Button>计算</Button>
                            </td>
                            <td colSpan="1" rowSpan="1">
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].Yc_EvaluationResults} />
                            </td>
                        </tr>
                        <tr>
                            <td>
    评价结果
                            </td>
                            <td colSpan="3" rowSpan="1">
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].DeviceType} />
                            </td>
                        </tr>
                        <tr>
                            <td rowSpan="4" style={{width: '12%', textAlign: 'left'}}>
    SO2校准
                            </td>
                            <td style={{textAlign: 'left'}}>
    对比测试仪原理
                            </td>
                            <td colSpan="1" rowSpan="1" style={{width: '25%', textAlign: 'left'}}>
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].SO2_Jz_PrincipleOfContrastTester} />
                            </td>
                            <td style={{width: '18%', textAlign: 'left'}}>
    CEMS分析仪原理
                            </td>
                            <td colSpan="1" rowSpan="1" style={{width: '25%', textAlign: 'left'}}>
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].SO2_Jz_PrincipleOfCEMSAnalyzer} />
                            </td>
                        </tr>
                        <tr>
                            <td>
    标准气浓度 （mg/m3）
                            </td>
                            <td colSpan="1" rowSpan="1">
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].SO2_Jz_CbThreeJz} />
                            </td>
                            <td>
    CEMS测定均值 （mg/m3）
                            </td>
                            <td colSpan="1" rowSpan="1">
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].SO2_Jz_CbCdJz} />
                            </td>
                        </tr>
                        <tr>
                            <td>
    公式
                            </td>
                            <td colSpan="1" rowSpan="1">
                                <Select style={{ width: 120 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].SO2_Jz_formula}>
                                    <Option value="相对误差">相对误差</Option>
                                    <Option value="绝对误差">绝对误差</Option>
                                </Select>
                            </td>
                            <td colSpan="1" rowSpan="1">
                                <Button>计算</Button>
                            </td>
                            <td colSpan="1" rowSpan="1">
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].SO2_Jz_EvaluationResults} />
                            </td>
                        </tr>
                        <tr>
                            <td>
    评价结果
                            </td>
                            <td colSpan="3" rowSpan="1">
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].DeviceType} />
                            </td>
                        </tr><tr>
                            <td rowSpan="4" style={{width: '12%', textAlign: 'left'}}>
    SO2比对监测
                            </td>
                            <td style={{textAlign: 'left'}}>
    对比测试仪原理
                            </td>
                            <td colSpan="1" rowSpan="1" style={{width: '25%', textAlign: 'left'}}>
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].SO2_Bd_PrincipleOfContrastTester} />
                            </td>
                            <td style={{width: '18%', textAlign: 'left'}}>
    CEMS分析仪原理
                            </td>
                            <td colSpan="1" rowSpan="1" style={{width: '25%', textAlign: 'left'}}>
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].SO2_Bd_PrincipleOfCEMSAnalyzer} />
                            </td>
                        </tr>
                        <tr>
                            <td>
    参比六次均值 （mg/m3）
                            </td>
                            <td colSpan="1" rowSpan="1">
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].SO2_Bd_CbThreeJz} />
                            </td>
                            <td>
    CEMS测定均值 （mg/m3）
                            </td>
                            <td colSpan="1" rowSpan="1">
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].SO2_Bd_CbCdJz} />
                            </td>
                        </tr>
                        <tr>
                            <td>
    公式
                            </td>
                            <td colSpan="1" rowSpan="1">
                                <Select style={{ width: 120 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].SO2_Bd_formula}>
                                    <Option value="相对误差">相对误差</Option>
                                    <Option value="绝对误差">绝对误差</Option>
                                </Select>
                            </td>
                            <td colSpan="1" rowSpan="1">
                                <Button>计算</Button>
                            </td>
                            <td colSpan="1" rowSpan="1">
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].SO2_Bd_EvaluationResults} />
                            </td></tr><tr>
                                <td>
    评价结果
                            </td>
                                <td colSpan="3" rowSpan="1">
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].DeviceType} />
                            </td>
                            </tr><tr>
                            <td rowSpan="4" style={{width: '12%', textAlign: 'left'}}>
    NOx校准
                                </td>
                            <td style={{textAlign: 'left'}}>
    对比测试仪原理
                                </td>
                            <td colSpan="1" rowSpan="1" style={{width: '25%', textAlign: 'left'}}>
                                    <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].NOX_Jz_PrincipleOfContrastTester} />
                                </td>
                            <td style={{width: '18%', textAlign: 'left'}}>
    CEMS分析仪原理
                                </td>
                            <td colSpan="1" rowSpan="1" style={{width: '25%', textAlign: 'left'}}>
                                    <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].NOX_Jz_PrincipleOfCEMSAnalyzer} />
                                </td>
                        </tr><tr>
                                <td>
    标准气浓度 （mg/m3）
                            </td>
                                <td colSpan="1" rowSpan="1">
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].NOX_Jz_CbThreeJz} />
                            </td>
                                <td>
    CEMS测定均值 （mg/m3）
                            </td>
                                <td colSpan="1" rowSpan="1">
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].NOX_Jz_CbCdJz} />
                            </td>
                            </tr><tr>
                            <td>
    公式
                                </td>
                            <td colSpan="1" rowSpan="1">
                                    <Select style={{ width: 120 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].NOX_Jz_formula}>
                                    <Option value="相对误差">相对误差</Option>
                                    <Option value="绝对误差">绝对误差</Option>
                                </Select>
                                </td>
                            <td colSpan="1" rowSpan="1">
                                    <Button>计算</Button>
                                </td>
                            <td colSpan="1" rowSpan="1">
                                    <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].NOX_Jz_EvaluationResults} />
                                </td></tr><tr>
                                <td>
    评价结果
                            </td>
                            <td colSpan="3" rowSpan="1">
                                        <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].DeviceType} />
                            </td>
                            </tr><tr>
                                    <td rowSpan="4" style={{width: '12%', textAlign: 'left'}}>
    NOx比对监测
                            </td>
                                    <td style={{textAlign: 'left'}}>
    对比测试仪原理
                            </td>
                                    <td colSpan="1" rowSpan="1" style={{width: '25%', textAlign: 'left'}}>
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].NOX_Db_PrincipleOfContrastTester} />
                            </td>
                                    <td style={{width: '18%', textAlign: 'left'}}>
    CEMS分析仪原理
                            </td>
                                    <td colSpan="1" rowSpan="1" style={{width: '25%', textAlign: 'left'}}>
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].NOX_Db_PrincipleOfCEMSAnalyzer} />
                            </td>
                                </tr><tr>
                            <td>
    参比六次均值 （mg/m3）
                                </td>
                            <td colSpan="1" rowSpan="1">
                                    <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].NOX_Db_CbThreeJz} />
                                </td>
                            <td>
    CEMS测定均值 （mg/m3）
                                </td>
                            <td colSpan="1" rowSpan="1">
                                    <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].NOX_Db_CbCdJz} />
                                </td>
                        </tr><tr>
                                <td>
    公式
                            </td>
                                <td colSpan="1" rowSpan="1">
                                <Select style={{ width: 120 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].NOX_Db_formula}>
                                        <Option value="相对误差">相对误差</Option>
                                        <Option value="绝对误差">绝对误差</Option>
                                    </Select>
                            </td>
                                <td colSpan="1" rowSpan="1">
                                <Button>计算</Button>
                            </td>
                                <td colSpan="1" rowSpan="1">
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].NOX_Db_EvaluationResults} />
                            </td></tr><tr>
                                    <td>
    评价结果
                                </td>
                            <td colSpan="3" rowSpan="1">
                                    <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].DeviceType} />
                                </td>
                                </tr><tr>
                            <td rowSpan="4" style={{width: '12%', textAlign: 'left'}}>
    O2比对监测
                                            </td>
                            <td style={{textAlign: 'left'}}>
    对比测试仪原理
                                            </td>
                            <td colSpan="1" rowSpan="1" style={{width: '25%', textAlign: 'left'}}>
                                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].O2_Bd_PrincipleOfContrastTester} />
                                            </td>
                                <td style={{width: '18%', textAlign: 'left'}}>
    CEMS分析仪原理
                                            </td>
                                <td colSpan="1" rowSpan="1" style={{width: '25%', textAlign: 'left'}}>
                                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].O2_Bd_PrincipleOfCEMSAnalyzer} />
                                            </td>
                        </tr><tr>
                                            <td>
    参比三次均值 （%）
                            </td>
                                            <td colSpan="1" rowSpan="1">
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].O2_Bd_CbThreeJz} />
                            </td>
                                            <td>
    CEMS测定均值 （%）
                            </td>
                                            <td colSpan="1" rowSpan="1">
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].O2_Bd_CbCdJz} />
                            </td>
                                        </tr><tr>
                            <td>
    公式
                                    </td>
                            <td colSpan="1" rowSpan="1">
                                        <Select style={{ width: 120 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].O2_Bd_formula}>
                                    <Option value="相对误差">相对误差</Option>
                                    <Option value="绝对误差">绝对误差</Option>
                                </Select>
                                    </td>
                            <td colSpan="1" rowSpan="1">
                                        <Button>计算</Button>
                                    </td>
                            <td colSpan="1" rowSpan="1">
                                        <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].O2_Bd_EvaluationResults} />
                                    </td></tr><tr>
                                <td>
    评价结果
                            </td>
                            <td colSpan="3" rowSpan="1">
                                    <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].DeviceType} />
                                </td>
                            </tr><tr>
                            <td rowSpan="4" style={{width: '12%', textAlign: 'left'}}>
    流速比对监测
                            </td>
                            <td style={{textAlign: 'left'}}>
    对比测试仪原理
                            </td>
                            <td colSpan="1" rowSpan="1" style={{width: '25%', textAlign: 'left'}}>
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].Ls_Bd_PrincipleOfContrastTester} />
                            </td>
                            <td style={{width: '18%', textAlign: 'left'}}>
    CEMS分析仪原理
                            </td>
                            <td colSpan="1" rowSpan="1" style={{width: '25%', textAlign: 'left'}}>
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].Ls_Bd_PrincipleOfCEMSAnalyzer} />
                            </td>
                        </tr><tr>
                            <td>
    参比三次均值 （m/s）
                                    </td>
                            <td colSpan="1" rowSpan="1">
                                        <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].Ls_Bd_CbThreeJz} />
                                    </td>
                            <td>
    CEMS测定均值 （m/s）
                                    </td>
                            <td colSpan="1" rowSpan="1">
                                        <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].Ls_Bd_CbCdJz} />
                                    </td>
                        </tr><tr>
                                    <td>
    公式
                            </td>
                                    <td colSpan="1" rowSpan="1">
                                <Select style={{ width: 120 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].Ls_Bd_formula}>
                                        <Option value="相对误差">相对误差</Option>
                                        <Option value="绝对误差">绝对误差</Option>
                                    </Select>
                            </td>
                                    <td colSpan="1" rowSpan="1">
                                <Button>计算</Button>
                            </td>
                                    <td colSpan="1" rowSpan="1">
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].Ls_Bd_EvaluationResults} />
                            </td></tr><tr>
                                    <td>
    评价结果
                                </td>
                                    <td colSpan="3" rowSpan="1">
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].DeviceType} />
                            </td>
                        </tr><tr>
                                <td rowSpan="4" style={{width: '12%', textAlign: 'left'}}>
    温度比对监测
                            </td>
                                <td style={{textAlign: 'left'}}>
    对比测试仪原理
                            </td>
                                <td colSpan="1" rowSpan="1" style={{width: '25%', textAlign: 'left'}}>
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].Temperature_Bd_PrincipleOfContrastTester} />
                            </td>
                                <td style={{width: '18%', textAlign: 'left'}}>
    CEMS分析仪原理
                            </td>
                                <td colSpan="1" rowSpan="1" style={{width: '25%', textAlign: 'left'}}>
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].Temperature_Bd_PrincipleOfCEMSAnalyzer} />
                            </td>
                            </tr>
                        <tr>
                            <td>
    参比三次均值 （℃）
                            </td>
                            <td colSpan="1" rowSpan="1">
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].Temperature_Bd_CbThreeJz} />
                            </td>
                            <td>
    CEMS测定均值 （℃）
                            </td>
                            <td colSpan="1" rowSpan="1">
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].Temperature_Bd_CbCdJz} />
                            </td>
                        </tr>
                        <tr>
                            <td>
    公式
                            </td>
                            <td colSpan="1" rowSpan="1">
                                <Select style={{ width: 120 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].Temperature_Bd_formula}>
                                    <Option value="相对误差">相对误差</Option>
                                    <Option value="绝对误差">绝对误差</Option>
                                </Select>
                            </td>
                            <td colSpan="1" rowSpan="1">
                                <Button>计算</Button>
                            </td>
                            <td colSpan="1" rowSpan="1">
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].Temperature_Bd_EvaluationResults} />
                            </td></tr><tr>
                                <td>
    评价结果
                            </td>
                                <td colSpan="3" rowSpan="1">
                                <Input style={{ width: 250 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].DeviceType} />
                            </td>
                            </tr><tr>
                            <td rowSpan="2">
    校验结论
                                </td>
                            <td colSpan="2">
    总体校准和比对监测是否合格
                                </td>
                            <td colSpan="2" rowSpan="1">
                                    <TextArea style={{width: '400px'}} autosize={{ minRows: 2, maxRows: 6 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].Result1} />
                                </td>
                        </tr><tr>
                                <td colSpan="2">
    如果总体校准和对比监测有不合格现象， 采取了哪些措施？计划还将采取什么措施？
                            </td>
                                <td colSpan="2" rowSpan="1">
                                <TextArea style={{width: '400px'}} autosize={{ minRows: 2, maxRows: 6 }} value={inspectionRecord.length === 0 ? '' : inspectionRecord[0].Result2} />
                            </td>
                            </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
