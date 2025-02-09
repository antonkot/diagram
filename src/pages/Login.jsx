import { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";

const Login = ({ userData, setUserData }) => {
  const [loading, setLoading] = useState(false); // ✅ Состояние загрузки (анимация кнопки)
  const navigate = useNavigate(); // ✅ Используется для перенаправления на другую страницу

  // ✅ Функция, вызываемая при успешном вводе данных
  const onFinish = (values) => {
    setLoading(true); // ✅ Включаем анимацию загрузки
    setTimeout(() => {
      message.success(`✅ Добро пожаловать, ${values.name} ${values.surname}!`); // ✅ Выводим сообщение об успешном входе
      setUserData(values); // ✅ Сохраняем данные пользователя
      setLoading(false); // ✅ Отключаем загрузку
      navigate("/test"); // ✅ Автоматически перенаправляем пользователя на страницу тестирования
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-96 shadow-lg">
        <h2 className="text-center text-2xl font-semibold mb-5">Вход</h2>
        <Form name="login" onFinish={onFinish} layout="vertical">
          {/* ✅ Поле ввода имени */}
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Пожалуйста, введите ваше имя!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Имя" />
          </Form.Item>

          {/* ✅ Поле ввода фамилии */}
          <Form.Item
            name="surname"
            rules={[
              { required: true, message: "Пожалуйста, введите вашу фамилию!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Фамилия" />
          </Form.Item>

          {/* ✅ Поле ввода группы */}
          <Form.Item
            name="group"
            rules={[
              { required: true, message: "Пожалуйста, введите вашу группу!" },
            ]}
          >
            <Input prefix={<TeamOutlined />} placeholder="Группа" />
          </Form.Item>

          {/* ✅ Кнопка входа */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Войти
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

// ✅ Определение типов пропсов (PropTypes)
Login.PropTypes = {
  userData: PropTypes.object, // ✅ userData - объект (информация о пользователе)
  setUserData: PropTypes.func.isRequired, // ✅ setUserData - функция (обновление данных пользователя)
};

export default Login;
