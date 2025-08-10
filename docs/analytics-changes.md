### Аналитика: изменения структуры и состава

Дата: автоматически сгенерировано

#### Краткое резюме
- Добавлен захват маркетингового контекста (UTM/LinkedIn) и его автоматическая прокладка во все события.
- Введён учёт времени просмотра контента (content time on view) с пульсами и финальными событиями.
- Существенно расширен каталог событий и типы для них; нормализация имён событий в snake_case.
- Добавлена санитизация свойств событий (удаление чувствительных ключей) и троттлинг «шумных» событий.
- Дедупликация identify и улучшения в кэшировании профиля пользователя.

---

### Текущий статус git (аналитика)

Ветка: `main` (сравнение c `origin/main`).

Изменённые файлы (аналитика):
- `lib/analytics.ts` — расширение API, санитизация, маркетинговый контекст, троттлинг, новые хелперы событий.
- `lib/analytics-types.ts` — расширен набор интерфейсов событий и полей, уточнены некоторые типы.
- `lib/user-analytics.ts` — защита от повторной идентификации, мелкие улучшения и форматирование.
- `components/analytics/PageTracker.tsx` — форматирование.

Новые (пока неиндексированные) файлы:
- `components/analytics/ContentTimeTracker.tsx` — компонент авто-учёта времени просмотра зоны контента.
- `components/analytics/MarketingBootstrap.tsx` — инициализация маркетингового контекста на клиенте.
- `hooks/use-marketing-bootstrap.ts` — хук для единичного чтения URL-параметров и сохранения их в storage.
- `hooks/use-time-on-view.ts` — хук с API `start/stop/pause/resume` и периодическими пульсами.
- `lib/marketing-context.ts` — чтение/персист контекста маркетинга (UTM/LinkedIn), объединение first-touch и latest.

Примечание: новые файлы отображаются как untracked (не добавлены в git).

---

### Новые возможности

#### Маркетинговый контекст (UTM/LinkedIn)
- Источник: `lib/marketing-context.ts`.
- Парсинг параметров URL: UTM (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`) и LinkedIn (`li_fat_id`/`li_click_id`, `li_lead_id`, `li_campaign_id`, `li_ad_id`, `li_placement`).
- Персист в `localStorage`:
  - First touch: `analytics:first_touch` (создаётся один раз с отметкой времени `first_touch_ts`).
  - Latest: `analytics:latest` (обновляется на каждом новом визите с параметрами).
- Объединённый контекст: `getMarketingContext()` возвращает merge first-touch и latest c фильтрацией пустых значений.
- Интеграция: `track()` автоматически добавляет поле `marketing` в payload каждого события.

#### Учёт времени просмотра контента
- Источник: `hooks/use-time-on-view.ts`, `components/analytics/ContentTimeTracker.tsx`.
- Событие: `content_time_spent` с полями:
  - `area_id` — идентификатор зоны/секции контента;
  - `spent_ms` — суммарное время в миллисекундах;
  - `is_final` — признак финального события (при unmount/уходе со страницы);
  - `...extra` — произвольные атрибуты.
- Поведение:
  - Минимальный порог `minThresholdMs` (по умолчанию 1000ms) отсекает слишком короткие просмотры;
  - Периодические «пульсы» (`pulseIntervalMs`, по умолчанию 30000ms) отправляют промежуточные накопленные значения;
  - Обработка `visibilitychange` (pause/resume) и `beforeunload` (финализация).

---

### Изменения в API аналитики

#### `track()`
- Имена событий автоматически нормализуются в `snake_case`.
- Происходит санитизация свойств: удаляются чувствительные ключи `email`, `password`, `token`, `authorization`, `secret`, `key`, `user_id`, `userId`.
- В payload всегда добавляется `meta.source = 'frontend'`; при `SEGMENT_DEBUG=true` добавляется `debug_mode`.
- Автоматически добавляется `marketing` из `getMarketingContext()`.

#### Троттлинг
- Добавлен универсальный враппер `throttled(fn, delay)` и применён к событию `graph_zoomed` (800ms), чтобы уменьшить шум.

#### Новые/обновлённые хелперы событий (`lib/analytics.ts`)
- Граф:
  - `track_graph_view_changed(p)`
  - `track_node_clicked(p)`
  - `track_node_expanded(p)` / `track_node_collapsed(p)`
  - `track_graph_zoomed(p)` (throttled 800ms)
  - `track_graph_filter_changed(p)`
- Чат/диалоги:
  - `track_question_submitted(p)`
  - `track_conversation_loaded(p)`
  - `track_message_copied(p)`, `track_content_copied(p)`
- Биллинг:
  - `track_subscription_cancelled(p)`
- Прочее:
  - `track_feature_used(p)`, `track_error_occurred(p)`, `track_help_requested(p)`
  - `track_search_performed(p)`, `track_file_uploaded(p)`, `track_download_initiated(p)`
  - `track_share_action(p)`, `track_preference_changed(p)`
  - `track_tutorial_step(p)`, `track_onboarding_completed(p)`
  - `track_logout_clicked()`

---

### Изменения и расширения типов (`lib/analytics-types.ts`)

Ключевые изменения совместимости:
- Graph события:
  - `GraphViewChangeProps`: добавлено поле `thread_id`.
  - `NodeClickProps`: поля заменены на `{ thread_id, target_id, node_type? }` (ранее было `node_id`, `graph_view`, `is_expanded` и др.).
  - `NodeExpansionProps`: теперь `{ thread_id, target_id, by_user }` вместо `expansion_type` и `child_node_count`.
  - `GraphZoomProps`: `zoom_type` теперь `'canvas' | 'node' | 'pinch' | 'manual' | 'fit'`; добавлено `scale?`.
  - `GraphFilterProps`: без изменений по смыслу, добавлен `thread_id`.
- Чат:
  - `QuestionSubmittedProps`: теперь `{ thread_id?, length, has_files? }` (вместо `chat_session_id`, `word_count`, `query_complexity`).
  - `ConversationLoadedProps`: `{ thread_id, extra_properties? }` (вместо `messages_count`).
- Копирование:
  - `MessageCopiedProps`, `ContentCopiedProps` — новые события.
- Биллинг:
  - `SubscriptionCancelledProps`: поля стали опциональными, добавлено `reason?`.
- Контент:
  - `ContentTimeSpentProps` — новое событие для учёта времени.
- Базовые свойства:
  - `BaseEventProperties`: теперь содержит `meta?: { source?: string; [key: string]: any }`, `debug_mode?`, `marketing?: Record<string, any>`.

---

### Идентификация пользователя
- `identify(userId)` теперь пропускает вызов при совпадении текущего `userId` (дедупликация) и логирует это в дебаг-режиме.
- `lib/user-analytics.ts / identifyUser(...)`:
  - ранняя проверка `isIdentificationPending` предотвращает коллизию параллельных вызовов;
  - гарантированная сброска флага через `finally`;
  - кэширование профиля в `cachedUserProfile`.

---

### Рекомендации по интеграции
1) Инициализация маркетинга (однократно на клиенте):
```tsx
// В корневом клиентском layout
import dynamic from 'next/dynamic';
const MarketingBootstrap = dynamic(() => import('components/analytics/MarketingBootstrap'), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <MarketingBootstrap />
        {children}
      </body>
    </html>
  );
}
```

2) Учёт времени просмотра секций:
```tsx
import ContentTimeTracker from 'components/analytics/ContentTimeTracker';

function InsightsPanel() {
  return (
    <section>
      <ContentTimeTracker areaId="insights_panel" />
      {/* ...контент панели... */}
    </section>
  );
}
```

3) Использование новых хелперов событий:
```ts
import { track_feature_used } from '@/lib/analytics';

track_feature_used({ feature: 'graph_filter', variant: 'by_labels' });
```

4) Переменные окружения:
- `SEGMENT_WRITE_KEY` — ключ проекта;
- `SEGMENT_ENABLED` — включает/выключает отправку;
- `SEGMENT_DEBUG` — включает подробные логи в консоли.

---

### Влияние на совместимость (Action Items)
- Обновить места, где формируются payload’ы граф-событий, в соответствии с новыми типами (`target_id`, `thread_id`, новые значения `zoom_type`, `by_user`).
- При переходе на новые события чата использовать `length`/`has_files` вместо `word_count`/`query_complexity`.
- Учитывать, что `track()` теперь удаляет чувствительные поля: не полагаться на их доставку в аналитике.
- Включить `MarketingBootstrap` в клиентский layout для корректной передачи UTM/LinkedIn.
- По возможности заменить прямые вызовы `track('event_name', ...)` на типизированные хелперы.

---

### Хранилище и приватность
- Используются `localStorage` ключи: `analytics:first_touch`, `analytics:latest`.
- Санитизация свойств по умолчанию исключает потенциально чувствительные данные из событий.

---

### Примечания
- `components/analytics/PageTracker.tsx` изменён только стилистически; функционально поведение `page()` без изменений.
- Для «шумных» пользовательских действий (масштабирование графа) добавлен троттлинг — это снизит нагрузку и объём событий в Segment.


