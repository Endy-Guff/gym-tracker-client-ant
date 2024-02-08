import styles from './page-layout.module.scss'
import Title from "antd/es/typography/Title";
import {FC, PropsWithChildren, ReactNode} from "react";

interface IPageLayoutProps {
    title: string;
    actions?: ReactNode[];
}

export const PageLayout: FC<PropsWithChildren<IPageLayoutProps>> = ({children, title, actions}) => <div
    className={styles.wrapper}>
    <div className={styles.header}>
        <Title className={styles.heading}>{title}</Title>
    </div>
    <div className={styles.body}>
        {actions && (
            <div className={styles.tableHeader}>
                {actions.map((action) => action)}
            </div>
        )}
        {children}
    </div>
</div>
