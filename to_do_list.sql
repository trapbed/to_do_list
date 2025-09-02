-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Сен 02 2025 г., 20:44
-- Версия сервера: 5.7.39
-- Версия PHP: 8.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `to_do_list`
--

-- --------------------------------------------------------

--
-- Структура таблицы `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(3, '2025_08_29_052358_create_tasks_table', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `tasks`
--

CREATE TABLE `tasks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `tasks`
--

INSERT INTO `tasks` (`id`, `user_id`, `title`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 19, 'Купить продукты для ужина', 'молоко, хлеб, яйца', '1', '2025-08-30 03:49:33', '2025-08-30 03:49:33'),
(3, 19, 'Послушать новый выпуск подкаста', 'Минаев \"История России\"', '0', '2025-08-30 04:00:17', '2025-08-31 06:03:32'),
(4, 19, 'Загрузить проект на github!!', 'Завершить выполнение задания и выгрузить актуальный код', '0', '2025-08-30 07:17:56', '2025-08-30 16:19:41'),
(5, 19, 'Выполнить упражнения по английскому языку', 'Повторить предыдущий урок, пройти новый  и выполнить задания', '1', '2025-08-30 07:21:52', '2025-08-30 14:03:48'),
(6, 19, 'Заполнить страницу в скетчбуке', 'Собрать главные мысли дня и внести в дневник с коллажем или иллюстрацией', '1', '2025-08-30 07:24:29', '2025-08-31 05:50:53'),
(20, NULL, '', '', '0', '2025-08-30 14:19:05', '2025-08-30 14:19:05'),
(24, 19, 'Попытка номер №5', 'А я простила я простила его опять опять опять', '0', '2025-08-31 06:18:03', '2025-08-31 06:18:03');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'qwerty@mail.ru', '$2y$10$qjUqwALwcveaoZxU0QTQXefiVuJv7jKgUsSxL4l8iNMC2yxcxTLC2', '2025-08-29 10:28:18', '2025-08-29 10:28:18'),
(5, 'qwerrtty@mail.ruq', '$2y$10$RBYq.aJGnzZeOhkiKMVdLu9Wp5IzG9lmCWjVMoSt4ziYnuTEzj5XK', '2025-08-29 11:43:49', '2025-08-29 11:43:49'),
(6, 'qwerrrtty@mail.ruq', '$2y$10$L6t8h.z06CGcI4dKyXniXeQAUoUAKJPt6hyE6nbg2F7iD7C/3DSRG', '2025-08-29 11:44:08', '2025-08-29 11:44:08'),
(7, 'qwerrrtty@mail.ruqr', '$2y$10$8uI5a7fLvwTgiPDNnf8cOOHzWBcQf7Q1mZcixdV1Z5vzxq7vVRbR2', '2025-08-29 11:44:15', '2025-08-29 11:44:15'),
(8, 'qwerrrtty@mail.ruqrde', '$2y$10$yzKebMjr0fgWBOw82GQCeekhOVPW1dFpkYKNyZvJRJrXjrqIPf2tq', '2025-08-29 11:44:45', '2025-08-29 11:44:45'),
(9, 'qwerrrtty@mail.ruqrdee', '$2y$10$r09V15nQbY2iM4eXddIRYuKluAw.Sawh7kDA.RtvU2tlocTU2KQuq', '2025-08-29 11:45:04', '2025-08-29 11:45:04'),
(10, 'qwertys@mail.ru', '$2y$10$I728Tux1sJWUPdvPIhnd9u7AyM4R3ZgtcbjrOEwvSoWH0z2eTRYoG', '2025-08-29 11:47:21', '2025-08-29 11:47:21'),
(11, 'qwewrtys@mail.ru', '$2y$10$63Kwe..KpbmwDQnBR2L8A.iFvW.Hie3ZGXtQzico4fghYzKEn4lQu', '2025-08-29 11:52:23', '2025-08-29 11:52:23'),
(12, 'qwewrtys@mail.rus', '$2y$10$ecUtBj.n9FPQePdg3AZ9m.MTJJzgq4tRQs17DXm2GBhRu5mCWwqHC', '2025-08-29 11:52:35', '2025-08-29 11:52:35'),
(13, 'qwewrtys@mail.russ', '$2y$10$P2c0tetXyr01dPoQ77LW3O65w8UAeI1YVoorHqsb7KG7KZ19g3t9u', '2025-08-29 11:53:08', '2025-08-29 11:53:08'),
(14, 'qwewrtys@mail.russo', '$2y$10$vrwLtYAMEMUz81wbjZkC5etEjifMfmw.GE8ix9.3b7ZrwkQRTw65G', '2025-08-29 11:54:57', '2025-08-29 11:54:57'),
(15, 'qwe@qwe.qwe', '$2y$10$143VcrUxlISj/duSF9D61uf3HSf/EsDytlSSVK51pP.Wh.T11pLTe', '2025-08-29 11:55:23', '2025-08-29 11:55:23'),
(17, 'qweqwe@qwe.qwe', '$2y$10$utSkZDGipmXuGpAn2S26muO/n6pbYzPk2upT9jpoXIQc9NC8v2Fha', '2025-08-30 02:46:50', '2025-08-30 02:46:50'),
(18, 'qweewq@qwe.qwe', '$2y$10$0DdbK1NKgth/pUaeATYL3ObUThC2YcjnycbUWZ1PBf7eXMpfe5BKG', '2025-08-30 07:16:36', '2025-08-30 07:16:36'),
(19, 'ru@ru.ru', '$2y$10$F13w9pzz2ux7S.PLgz5w8eUXIdt60xd/VGms2w0fDWLpiVzxhqOx6', '2025-08-30 07:57:04', '2025-08-30 07:57:04');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tasks_user_id_foreign` (`user_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
