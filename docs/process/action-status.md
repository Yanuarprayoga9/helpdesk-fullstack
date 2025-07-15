# Ticket Status Actions Documentation

## Overview

Fungsi `getAvailableActions()` mengembalikan array dari aksi yang tersedia berdasarkan status ticket saat ini. Setiap aksi memiliki label untuk ditampilkan ke user dan status tujuan yang akan dicapai setelah aksi tersebut dilakukan.

## Function Signature

```typescript
export const getAvailableActions = (status: string) => Array<{
  label: string;
  nextStatus: string;
}>
```

## Source Code

```typescript
export const getAvailableActions = (status: string) => {
  switch (status) {
    case 'New':
      return [{ label: 'Take Ticket', nextStatus: 'InProgress' }];

    case 'InProgress':
      return [
        { label: 'Put On Hold', nextStatus: 'OnHold' },
        { label: 'Mark as Resolve', nextStatus: 'Resolved' },
        { label: 'Request Help', nextStatus: 'requestHelp' },
      ];

    case 'OnHold':
      return [{ label: 'Resume', nextStatus: 'InProgress' }];

    case 'Resolved':
      return [
        { label: 'Close Ticket', nextStatus: 'Closed' },
        { label: 'Reopen', nextStatus: 'Reopened' },
      ];

    case 'Closed':
      return [{ label: 'Reopen', nextStatus: 'Reopened' }];

    case 'Reopened':
      return [{ label: 'Resume', nextStatus: 'InProgress' }];

    case 'requestHelp':
      return [
        { label: 'Resume Work', nextStatus: 'InProgress' },
        { label: 'Put On Hold', nextStatus: 'OnHold' },
      ];

    default:
      return [];
  }
};
```

## Status Flow dan Available Actions

### 1. New
**Aksi yang tersedia:**
- **Take Ticket** → `InProgress`

Status awal untuk ticket baru yang belum ada yang menangani.

### 2. InProgress
**Aksi yang tersedia:**
- **Put On Hold** → `OnHold`
- **Mark as Resolve** → `Resolved`
- **Request Help** → `requestHelp`

Status ketika ticket sedang dalam proses penanganan aktif.

### 3. OnHold
**Aksi yang tersedia:**
- **Resume** → `InProgress`

Status ketika ticket dihentikan sementara karena menunggu informasi tambahan atau kondisi tertentu.

### 4. Resolved
**Aksi yang tersedia:**
- **Close Ticket** → `Closed`
- **Reopen** → `Reopened`

Status ketika ticket sudah diselesaikan dan menunggu konfirmasi untuk ditutup atau dibuka kembali.

### 5. Closed
**Aksi yang tersedia:**
- **Reopen** → `Reopened`

Status akhir ketika ticket sudah selesai dan ditutup. Masih bisa dibuka kembali jika diperlukan.

### 6. Reopened
**Aksi yang tersedia:**
- **Resume** → `InProgress`

Status ketika ticket yang sudah closed dibuka kembali untuk penanganan lebih lanjut.

### 7. requestHelp
**Aksi yang tersedia:**
- **Resume Work** → `InProgress`
- **Put On Hold** → `OnHold`

Status ketika sedang meminta bantuan untuk menangani ticket yang kompleks atau butuh expertise khusus.


## Usage Example

```typescript
// Mendapatkan aksi yang tersedia untuk ticket dengan status "InProgress"
const actions = getAvailableActions('InProgress');
console.log(actions);
// Output:
// [
//   { label: 'Put On Hold', nextStatus: 'OnHold' },
//   { label: 'Mark as Resolve', nextStatus: 'Resolved' },
//   { label: 'Request Help', nextStatus: 'requestHelp' }
// ]

// Jika status tidak dikenali, akan mengembalikan array kosong
const unknownActions = getAvailableActions('InvalidStatus');
console.log(unknownActions); // Output: []
```

## Notes

- Fungsi ini menggunakan pattern switch-case untuk menentukan aksi berdasarkan status
- Jika status tidak dikenali, fungsi akan mengembalikan array kosong
- Setiap aksi memiliki struktur yang konsisten dengan properti `label` dan `nextStatus`
- Status `requestHelp` menggunakan camelCase berbeda dengan status lainnya yang menggunakan PascalCase