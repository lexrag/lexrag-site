# LEXRAG Marketing Site

Маркетинговый сайт для LEXRAG, развернутый на AWS S3 + CloudFront.

## 🚀 Быстрый старт

### Локальная разработка
```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки на порту 3001
npm run dev
```

Сайт будет доступен по адресу: http://localhost:3001

### Сборка
```bash
# Сборка статического сайта
npm run build

# Сборка для продакшена
npm run build:staging
```

## 🌐 Деплой

### Автоматический деплой
```bash
# Установите переменные окружения
export CLOUDFRONT_DISTRIBUTION_ID=your_distribution_id
export AWS_DEFAULT_REGION=us-east-1

# Запустите деплой
./deploy.sh
```

### Ручной деплой
```bash
# Сборка
npm run build

# Синхронизация с S3
aws s3 sync ./out/ s3://lexrag-marketing-site/

# Инвалидация CloudFront
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
```

## 🏗️ Архитектура

- **Фронтенд**: Next.js 15 с статическим экспортом
- **Хостинг**: AWS S3 + CloudFront
- **Домен**: lexrag.com
- **Локальный порт**: 3001

## 📁 Структура проекта

```
├── app/                    # Next.js App Router
│   ├── (general)/         # Общие страницы
│   │   ├── features/      # Страницы функций
│   │   ├── services/      # Страница услуг
│   │   ├── company/       # О компании
│   │   ├── use-cases/     # Примеры использования
│   │   ├── faq/           # Часто задаваемые вопросы
│   │   └── technology/    # Технологии
│   ├── terms-and-conditions/  # Правовые документы
│   └── layout.tsx         # Корневой layout
├── components/             # React компоненты
│   ├── Header/            # Шапка сайта
│   ├── Landing/           # Лендинг компоненты
│   ├── Features/          # Компоненты функций
│   ├── Layout/            # Компоненты макета
│   └── ui/                # UI компоненты
├── css/                   # Стили
├── public/                # Статические файлы
└── deploy.sh              # Скрипт деплоя
```

## 🔧 Конфигурация

### Переменные окружения
Скопируйте `env.marketing.example` в `.env.local` и настройте:

```bash
# AWS Configuration
AWS_DEFAULT_REGION=us-east-1
CLOUDFRONT_DISTRIBUTION_ID=your_cloudfront_distribution_id

# Next.js Configuration
NEXT_PUBLIC_BASE_PATH=
```

### Next.js конфигурация
- `output: 'export'` - статический экспорт
- `trailingSlash: true` - совместимость с S3
- Порт разработки: 3001

## 📱 Доступные страницы

### Основные страницы
- **Главная** (`/`) - Лендинг с функциями продукта
- **Features** (`/features`) - Все функции продукта
- **Services** (`/services`) - Наши услуги
- **Company** (`/company`) - О компании
- **Use Cases** (`/use-cases`) - Примеры использования
- **FAQ** (`/faq`) - Часто задаваемые вопросы

### Технологии
- **Technology** (`/technology/graphrag`) - О технологии GraphRAG

### Правовые документы
- **Terms & Conditions** (`/terms-and-conditions/`) - Правовые документы
- **Privacy Policy** (`/terms-and-conditions/privacy-policy/`)
- **Cookie Policy** (`/terms-and-conditions/cookie-policy/`)
- **Refund Policy** (`/terms-and-conditions/refund-cancellation/`)
- **Data Processing** (`/terms-and-conditions/data-processing-agreement/`)
- **EULA** (`/terms-and-conditions/end-user-license/`)

## 🚨 Важные замечания

1. **Статический сайт**: Все страницы генерируются статически
2. **Нет API**: API endpoints перенесены в app.lexrag.com
3. **Нет авторизации**: Функции авторизации в app.lexrag.com
4. **S3 совместимость**: Используйте `trailingSlash: true`

## 🔄 CI/CD

Для автоматизации деплоя добавьте в ваш CI/CD pipeline:

```yaml
- name: Deploy to S3
  run: |
    export CLOUDFRONT_DISTRIBUTION_ID=${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }}
    export AWS_DEFAULT_REGION=us-east-1
    ./deploy.sh
```

## 🧪 Тестирование

### Локальное тестирование
```bash
# Запуск в режиме разработки
npm run dev

# Проверка доступности страниц
curl http://localhost:3001
curl http://localhost:3001/features
curl http://localhost:3001/services
curl http://localhost:3001/company
curl http://localhost:3001/use-cases
curl http://localhost:3001/faq
curl http://localhost:3001/technology/graphrag
```

### Проверка сборки
```bash
# Сборка проекта
npm run build

# Проверка статических файлов
ls -la out/
```

## 🚀 Деплой на продакшен

1. **Настройка AWS CLI**:
   ```bash
   aws configure
   # Введите ваш AWS Access Key ID, Secret Access Key, и регион us-east-1
   ```

2. **Настройка переменных окружения**:
   ```bash
   export CLOUDFRONT_DISTRIBUTION_ID=your_distribution_id
   export AWS_DEFAULT_REGION=us-east-1
   ```

3. **Запуск деплоя**:
   ```bash
   ./deploy.sh
   ```

4. **Проверка результата**:
   - Откройте https://lexrag.com
   - Проверьте все страницы
   - Убедитесь, что CloudFront инвалидация прошла успешно

## 📞 Поддержка

При возникновении проблем обращаться к команде DevOps или создавать issue в репозитории.

## 🔗 Полезные ссылки

- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [AWS S3 Sync](https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html)
- [CloudFront Invalidation](https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_CreateInvalidation.html)
