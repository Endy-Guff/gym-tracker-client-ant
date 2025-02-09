import type { Dayjs } from "dayjs";
import { Button, Calendar, Typography } from "antd";
import {
  useCreateWorkoutMutation,
  useGetWorkoutsQuery,
} from "../../services/api/workout/api.ts";
import dayjs from "dayjs";
import { PlusOutlined } from "@ant-design/icons";
import { PageLayout } from "../../layouts/page";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export const WorkoutsPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs(new Date()));

  const { data } = useGetWorkoutsQuery();
  const [createWorkout] = useCreateWorkoutMutation();
  const dateCellRender = (value: Dayjs) => {
    const workout = data?.find((workout) =>
      value
        .startOf("day")
        .isSame(dayjs(workout.date, "DD-MM-YYYY").startOf("day"), "day")
    );

    if (workout) {
      return <Text>Есть тренировка</Text>;
    } else return;
  };

  const handleWorkoutCreate = (date: Dayjs) =>
    createWorkout({ date: date.format("DD-MM-YYYY") });

  const handleDateSelect = (date: Dayjs) => {
    const workout = data?.find((workout) =>
      date
        .startOf("day")
        .isSame(dayjs(workout.date, "DD-MM-YYYY").startOf("day"), "day")
    );
    if (workout) {
      navigate(`${workout.id}`);
    } else {
      setSelectedDate(date);
    }
  };

  return (
    <>
      <PageLayout
        title="Тренировки"
        actions={[
          <Button
            onClick={() => handleWorkoutCreate(selectedDate)}
            icon={<PlusOutlined />}
            disabled={!selectedDate}
            type="primary"
          >
            Новая тренировка
          </Button>,
        ]}
      >
        <Calendar
          cellRender={(current) => dateCellRender(current)}
          mode="month"
          onSelect={handleDateSelect}
        />
        ;
      </PageLayout>
    </>
  );
};
