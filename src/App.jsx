import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tables from "./components/Tables";
import { generalData } from "./baza/baza";
import ChartCard from "./components/ChatrCard";
import { useState, useEffect, useMemo, useCallback } from "react";
import { tests } from "./baza/test";
import Login from "./pages/Login";

const App = () => {
  // ✅ Сохранение данных пользователя
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    group: "",
  });

  // ✅ Сохранение результатов тестов
  const [testResults, setTestResults] = useState({});

  // ✅ Общее количество баллов
  const [allBall, setAllBall] = useState(0);

  // ✅ База данных тестов и начальные значения (по умолчанию 0)
  const [DataBase, setDataBase] = useState([
    { name: "Подбирать технологическое оборудование", value: 0 },
    { name: "Собирать схемы технологических устройств", value: 0 },
    { name: "Знать основные законы в энергетике", value: 0 },
    { name: "Знать метрологические аспекты", value: 0 },
    { name: "Уметь прогнозировать отказы", value: 0 },
    { name: "Выполнять расчёт оборудования", value: 0 },
    { name: "Управлять программным обеспечением", value: 0 },
    { name: "Уметь устранить неисправности", value: 0 },
    { name: "Выбирать тип трансформаторов", value: 0 },
    { name: "Знание энергетических объектов", value: 0 },
  ]);

  // ✅ Функция обновления базы данных на основе результатов тестов
  const updateDataBase = useCallback(() => {
    let totalScore = 0; // ✅ Общее количество баллов

    console.log("✅ Результаты тестов:", testResults); // 🔍 Проверка данных

    const newDataBase = DataBase.map((group, index) => {
      let groupTotal = 0;

      Object.keys(testResults).forEach((key) => {
        const [row] = key.split("-");
        if (parseInt(row, 10) === index + 1) {
          groupTotal += testResults[key] === 1 ? 0.2 : 0; // ✅ Начисление 0.2 балла за правильный ответ
        }
      });

      totalScore += groupTotal; // ✅ Подсчет общего количества баллов
      return { ...group, value: groupTotal };
    });

    console.log("✅ Обновленная база данных:", newDataBase); // 🔍 Проверка данных
    console.log("✅ Общее количество баллов:", totalScore.toFixed(1)); // 🔍 Проверка данных

    setDataBase(newDataBase); // ✅ Обновление базы данных
    setAllBall(totalScore.toFixed(1)); // ✅ Обновление общего количества баллов
  }, [testResults]);

  // ✅ Автоматическое обновление базы данных при изменении результатов тестов
  useEffect(() => {
    updateDataBase();
  }, [testResults]); // ❗ Обновление срабатывает только при изменении `testResults`

  // ✅ Оптимизация базы данных с использованием `useMemo`
  const memoizedDataBase = useMemo(() => {
    return DataBase;
  }, [DataBase]);

  return (
    <Router>
      <Routes>
        {/* ✅ Страница авторизации (входа) */}
        <Route
          path="/"
          element={<Login userData={userData} setUserData={setUserData} />}
        />

        {/* ✅ Страница тестирования */}
        <Route
          path="/test"
          element={
            <div className="p-5 flex flex-row gap-5">
              {/* ✅ Основная область тестирования */}
              <div className="w-[100%] md:w-[70%] flex flex-col gap-5">
                <div className="flex flex-col gap-2 bg-white p-5 rounded">
                  <h1 className="text-lg font-semibold">Данные студента</h1>
                  <div className="flex items-center gap-2">
                    <h1 className="">Имя: {userData.name} </h1>
                    <h1>Фамилия: {userData.surname}</h1>
                    <h1>Группа: {userData.group}</h1>
                    <h3 className="text-lg font-semibold">
                      Общий результат: {allBall} /{" "}
                      {(Object.keys(tests).length * 1).toFixed(1)}
                    </h3>
                  </div>
                </div>

                {/* ✅ Таблица с тестами */}
                <Tables
                  generalData={generalData}
                  testResults={testResults}
                  setTestResults={setTestResults}
                  tests={tests}
                />
              </div>

              {/* ✅ График с результатами */}
              <div className="w-[100%] md:w-[30%]">
                <ChartCard data={memoizedDataBase} generalData={generalData} />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
