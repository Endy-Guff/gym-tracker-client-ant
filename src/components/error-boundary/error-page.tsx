import {FC} from 'react';
import {useNavigate} from 'react-router-dom';

import {Button, Typography} from 'antd';

import styles from './error-boundary.module.scss';

const {Text} = Typography;

export interface IErrorPageProps {
    code: 404 | 401 | 503 | 500;
    text: string;
    btnLabel?: string;
    onClick?: () => void;
}

export const ErrorPage: FC<IErrorPageProps> = ({
                                                   code,
                                                   text,
                                                   btnLabel = 'Вернуться на главную',
                                                   onClick,
                                               }) => {
    const navigate = useNavigate();

    const buttonHandler = onClick ?? (() => navigate('/'));

    return (
        <div className={styles.container}>
            <div className={styles.error_boundary}>
                <Text className={styles.error_boundary__title}>{String(code)}</Text>
                <Text className={styles.error_boundary__text}>{text}</Text>
                <Button
                    className={styles.error_boundary__button}
                    onClick={buttonHandler}
                >
                    {btnLabel}
                </Button>
            </div>
        </div>
    );
};
