import {FC, createElement, useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';

import {
    BoxPlotOutlined,
    GroupOutlined,
} from '@ant-design/icons';
import {Layout, Menu} from 'antd';
import type {MenuProps} from 'antd';
import {INavigationItemPathType} from "../../services/api/types/common.ts";

const {Content, Sider} = Layout;

export const MainLayout: FC = () => {
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);
    const [current, setCurrent] = useState<INavigationItemPathType>(
        () => location.pathname.match(/^\/([^/]+)/)?.[1] as INavigationItemPathType
    );

    const handleMenuClick: MenuProps['onClick'] = ({key}) => {
        if (current === key && !location.pathname.match(/^\/[^/]+\/([^/]+)/)?.[1])
            return;

        if (key) {
            setCurrent(key as INavigationItemPathType);
            navigate(key);
        }
    };

    const getMenuItems = (): MenuProps['items'] => [
        {
            icon: createElement(GroupOutlined),
            key: 'groups',
            label: 'Группы',
        },
        {
            icon: createElement(BoxPlotOutlined),
            key: 'exercises',
            label: 'Упражнения',
        },
    ];


    const renderMenu = () => (
        <Menu
            onClick={handleMenuClick}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[current]}
            selectedKeys={[current]}
            items={getMenuItems()}
        />
    );

    return (
        <Layout style={{minHeight: '100vh', width: '100vw'}}>
            <Sider
                style={{position: 'fixed', height: '100vh'}}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                {renderMenu()}
            </Sider>
            <Layout
                style={{
                    width: '100%',
                    marginLeft: collapsed ? 80 : 200,
                    transition: '.2s',
                }}
            >
                <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
};
