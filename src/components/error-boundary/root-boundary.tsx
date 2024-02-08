import {
    useRouteError,
    isRouteErrorResponse,
    Navigate,
} from 'react-router-dom';

import { Typography } from 'antd';

import { ErrorPage } from './error-page';

import styles from './error-boundary.module.scss';

const { Text } = Typography;

export const RootBoundary = () => {
    const error = useRouteError();
    let errorPage = <Text>Что-то пошло не так и мы знаем об этом</Text>;

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            errorPage = (
                <ErrorPage
                    code={error.status}
                    text="Кажется мы потеряли страницу и не можем найти. Попробуй по новой."
                />
            );
        }

        if (error.status === 401) {
            return <Navigate to="/login" />;
        }

        if (error.status === 500) {
            errorPage = (
                <ErrorPage
                    code={error.status}
                    text="Сервер прилег отдохнуть. Подождите пару минут он отдохнет и будет работать как надо"
                />
            );
        }

        if (error.status === 503) {
            errorPage = (
                <ErrorPage
                    code={error.status}
                    text="Наши сервера не готовы обрабатывать запросы. Попробуйте по новой"
                />
            );
        }
    }

    return <div className={styles.root_boundary}>{errorPage}</div>;
};
