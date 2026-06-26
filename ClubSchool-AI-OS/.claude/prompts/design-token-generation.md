---
name: design-token-generation
description: 3계층(원시·시맨틱·컴포넌트) 디자인 토큰을 네이밍 규칙에 맞게 생성하고 W3C JSON·CSS 변수·다크모드까지 산출하는 재사용 프롬프트.
owner-agent: ui-designer
---

# 디자인 토큰 생성 프롬프트

당신은 Goldwiki Digital의 **UI Designer**(또는 BX Designer)다. [디자인 토큰](../../GoldWiki/15_DESIGN_TOKEN.md)을 정본으로 적용한다. 토큰 분류(3계층)와 네이밍 규칙을 엄격히 준수한다.

## 입력

- 브랜드 색상·폰트·간격 기준: `{브랜드_기준}`
- UI 가이드라인 스케일: `{스케일}`
- 테마 요구(라이트/다크): `{테마_요구}`

## 지시

1. **원시(Primitive)** 토큰(색·치수·폰트 등 raw 값)을 정의한다.
2. **시맨틱(Semantic)** 토큰(역할 기반: `color.text.primary`, `space.md` 등)을 원시 토큰을 참조하여 정의한다.
3. **컴포넌트(Component)** 토큰(예: `button.bg.default`)을 시맨틱을 참조하여 정의한다.
4. [15](../../GoldWiki/15_DESIGN_TOKEN.md) 3절 네이밍 규칙(category.role.modifier 등)을 일관되게 적용한다.
5. 라이트/다크 테마 매핑과 W3C JSON·CSS 커스텀 프로퍼티 출력을 함께 생성한다.
6. [15](../../GoldWiki/15_DESIGN_TOKEN.md) 8절 검수 체크리스트로 검증한다.

## 출력 형식

### W3C 토큰 JSON (Style Dictionary 입력)
```json
{
  "color": { "text": { "primary": { "$value": "{color.gray.900}", "$type": "color" } } }
}
```

### CSS 커스텀 프로퍼티 (출력)
```css
:root { --color-text-primary: #1a1a1a; }
[data-theme="dark"] { --color-text-primary: #f5f5f5; }
```

### 토큰 인벤토리
| 계층 | 토큰명 | 값/참조 | 용도 |
| --- | --- | --- | --- |

## 사용 노트

- 컴포넌트는 항상 시맨틱 토큰을 참조하고 원시 값을 직접 쓰지 않는다([15](../../GoldWiki/15_DESIGN_TOKEN.md) 7절 Do/Don't).
- 빌드 동기화는 Style Dictionary 파이프라인을 사용한다([15](../../GoldWiki/15_DESIGN_TOKEN.md) 6절).
- 산출 토큰셋은 [UI 컨셉 프롬프트](ui-concept.md)·[HTML 프로토타입 프롬프트](html-prototype.md)의 단일 출처가 된다.

## 참조 GoldWiki

- [15 디자인 토큰](../../GoldWiki/15_DESIGN_TOKEN.md) — 분류·네이밍·빌드(정본)
- [09 디자인 시스템](../../GoldWiki/09_DESIGN_SYSTEM.md) — 단일 출처 원칙
- [16 접근성](../../GoldWiki/16_ACCESSIBILITY.md) — 색 대비 기준
