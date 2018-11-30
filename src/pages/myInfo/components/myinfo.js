import CSSModules from 'react-css-modules'
import styles from '../styles/myinfo.css'
import {connect} from 'dva'
import Header from '../../../components/header/header'
import {List, Modal,Switch} from 'antd-mobile'
import icon from '../images/icon-head.png'
import router from 'umi/router'
import config from '../../../utils/config'
import person from '../../personal/images/person.png'

const Item = List.Item;

const Example = ({data,loginOut,assignTrade,trade}) => {
    return (
        <div className={'myinfo'}>
            <List style={{marginTop: '.1rem'}}>
                <Item
                    extra={data.帐号}
                    // arrow={'horizontal'}
                >账号</Item>
                <Item
                    onClick={() => {
                        router.push({pathname: '/myInfoModify'})
                    }}
                    extra={'修改'}
                    arrow={'horizontal'}
                >登录密码</Item>
                <Item
                    extra={<Switch
                        onClick={assignTrade}
                        checked={trade}
                    />}
                >交易需确认</Item>
            </List>
            <List style={{marginTop: '.1rem'}}>
                <Item
                    arrow={'horizontal'}
                    onClick={loginOut}
                >
                    <p style={{color: '#ff2727'}}>退出登录</p>
                </Item>
            </List>
        </div>
    );
};

const mapStateToProps = state => ({
    data: state.personal.info,
    trade:localStorage.getItem(config.TRADE_SWITCH) === null ? true : localStorage.getItem(config.TRADE_SWITCH) === "true" ? true : false
})

const mapDispatchToProps = (dispatch, props) => ({
    assignTrade:(checked) => {
        localStorage.setItem(config.TRADE_SWITCH,checked)
    },
    loginOut: () => {
        dispatch({
            type:'login/loginOut'
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Example, styles))

