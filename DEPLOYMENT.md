# 🚀 Инструкции по деплою LEXRAG Marketing Site

## 📋 Предварительные требования

### 1. AWS CLI
```bash
# Установка AWS CLI (если не установлен)
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /

# Проверка версии
aws --version
```

### 2. Настройка AWS
```bash
# Настройка AWS credentials
aws configure

# Введите следующие данные:
# AWS Access Key ID: [ваш_access_key]
# AWS Secret Access Key: [ваш_secret_key]
# Default region name: us-east-1
# Default output format: json
```

### 3. Переменные окружения
```bash
# Скопируйте пример файла
cp env.marketing.example .env.local

# Отредактируйте .env.local
export CLOUDFRONT_DISTRIBUTION_ID=your_distribution_id
export AWS_DEFAULT_REGION=us-east-1
```

## 🔧 Локальная разработка

### Запуск в режиме разработки
```bash
# Установка зависимостей
npm install

# Запуск на порту 3001
npm run dev
```

Сайт будет доступен по адресу: http://localhost:3001

### Проверка сборки
```bash
# Сборка статического сайта
npm run build

# Проверка сгенерированных файлов
ls -la out/
```

## 🌐 Деплой на продакшен

### Автоматический деплой (рекомендуется)
```bash
# Сделайте скрипт исполняемым
chmod +x deploy.sh

# Запустите деплой
./deploy.sh
```

### Ручной деплой
```bash
# 1. Сборка проекта
npm run build

# 2. Синхронизация с S3
aws s3 sync ./out/ s3://lexrag-marketing-site/ --delete

# 3. Инвалидация CloudFront
aws cloudfront create-invalidation \
    --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
    --paths "/*"
```

## 📱 Проверка деплоя

### 1. Проверка S3
```bash
# Проверка загруженных файлов
aws s3 ls s3://lexrag-marketing-site/ --recursive

# Проверка конкретного файла
aws s3 ls s3://lexrag-marketing-site/index.html
```

### 2. Проверка CloudFront
```bash
# Проверка статуса инвалидации
aws cloudfront list-invalidations --distribution-id $CLOUDFRONT_DISTRIBUTION_ID

# Проверка последней инвалидации
aws cloudfront get-invalidation \
    --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
    --id [invalidation_id]
```

### 3. Проверка доступности
```bash
# Проверка главной страницы
curl -I https://lexrag.com

# Проверка других страниц
curl -I https://lexrag.com/features
curl -I https://lexrag.com/services
curl -I https://lexrag.com/company
```

## 🔄 CI/CD интеграция

### GitHub Actions
```yaml
name: Deploy to S3

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '22'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build project
      run: npm run build
    
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v4
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
    
    - name: Deploy to S3
      run: aws s3 sync ./out/ s3://lexrag-marketing-site/ --delete
    
    - name: Invalidate CloudFront
      run: |
        aws cloudfront create-invalidation \
          --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
          --paths "/*"
```

### GitLab CI
```yaml
deploy:
  stage: deploy
  image: node:22
  script:
    - npm ci
    - npm run build
    - aws s3 sync ./out/ s3://lexrag-marketing-site/ --delete
    - aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
  only:
    - main
```

## 🚨 Troubleshooting

### Проблемы с AWS CLI
```bash
# Проверка конфигурации
aws configure list

# Проверка прав доступа
aws sts get-caller-identity

# Проверка доступа к S3
aws s3 ls s3://lexrag-marketing-site/
```

### Проблемы с CloudFront
```bash
# Проверка статуса дистрибуции
aws cloudfront get-distribution --id $CLOUDFRONT_DISTRIBUTION_ID

# Проверка инвалидаций
aws cloudfront list-invalidations --distribution-id $CLOUDFRONT_DISTRIBUTION_ID
```

### Проблемы с S3
```bash
# Проверка bucket policy
aws s3api get-bucket-policy --bucket lexrag-marketing-site

# Проверка CORS
aws s3api get-bucket-cors --bucket lexrag-marketing-site
```

## 📊 Мониторинг

### CloudWatch метрики
- Request count
- Error rate
- Latency
- Cache hit ratio

### S3 метрики
- Bucket size
- Object count
- Request count
- Error rate

## 🔒 Безопасность

### IAM Policy для деплоя
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::lexrag-marketing-site",
                "arn:aws:s3:::lexrag-marketing-site/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "cloudfront:CreateInvalidation",
                "cloudfront:GetInvalidation",
                "cloudfront:ListInvalidations"
            ],
            "Resource": "arn:aws:cloudfront::*:distribution/*"
        }
    ]
}
```

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи AWS CLI
2. Проверьте статус CloudFront
3. Проверьте права доступа IAM
4. Обратитесь к команде DevOps

## 🔗 Полезные ссылки

- [AWS CLI Documentation](https://docs.aws.amazon.com/cli/)
- [S3 Sync Command](https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html)
- [CloudFront Invalidation](https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_CreateInvalidation.html)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
