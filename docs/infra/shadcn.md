# Dokumentasi Instalasi Komponen shadcn/ui

## Format Perintah Dasar
```bash
npx shadcn-ui@latest add [nama-komponen]
```

## Daftar Komponen shadcn/ui

### 1. Form & Input Components

| Komponen | Perintah Instalasi | Deskripsi |
|----------|-------------------|-----------|
| Button | `npx shadcn-ui@latest add button` | Tombol dengan berbagai variant dan size |
| Input | `npx shadcn-ui@latest add input` | Input field dasar |
| Textarea | `npx shadcn-ui@latest add textarea` | Area teks multi-line |
| Label | `npx shadcn-ui@latest add label` | Label untuk form elements |
| Checkbox | `npx shadcn-ui@latest add checkbox` | Checkbox input |
| Radio Group | `npx shadcn-ui@latest add radio-group` | Grup radio button |
| Select | `npx shadcn-ui@latest add select` | Dropdown select |
| Switch | `npx shadcn-ui@latest add switch` | Toggle switch |
| Slider | `npx shadcn-ui@latest add slider` | Range slider |
| Form | `npx shadcn-ui@latest add form` | Form wrapper dengan validasi |

### 2. Layout Components

| Komponen | Perintah Instalasi | Deskripsi |
|----------|-------------------|-----------|
| Card | `npx shadcn-ui@latest add card` | Container dengan header, content, footer |
| Sheet | `npx shadcn-ui@latest add sheet` | Sliding panel dari sisi layar |
| Tabs | `npx shadcn-ui@latest add tabs` | Tab navigation |
| Separator | `npx shadcn-ui@latest add separator` | Garis pemisah horizontal/vertikal |
| Aspect Ratio | `npx shadcn-ui@latest add aspect-ratio` | Container dengan rasio aspek tetap |
| Scroll Area | `npx shadcn-ui@latest add scroll-area` | Area dengan custom scrollbar |

### 3. Navigation Components

| Komponen | Perintah Instalasi | Deskripsi |
|----------|-------------------|-----------|
| Navigation Menu | `npx shadcn-ui@latest add navigation-menu` | Menu navigasi dengan dropdown |
| Breadcrumb | `npx shadcn-ui@latest add breadcrumb` | Breadcrumb navigation |
| Pagination | `npx shadcn-ui@latest add pagination` | Pagination controls |
| Command | `npx shadcn-ui@latest add command` | Command palette/search |

### 4. Feedback Components

| Komponen | Perintah Instalasi | Deskripsi |
|----------|-------------------|-----------|
| Alert | `npx shadcn-ui@latest add alert` | Alert notification |
| Toast | `npx shadcn-ui@latest add toast` | Toast notification |
| Progress | `npx shadcn-ui@latest add progress` | Progress bar |
| Skeleton | `npx shadcn-ui@latest add skeleton` | Loading skeleton |
| Badge | `npx shadcn-ui@latest add badge` | Small status indicator |

### 5. Overlay Components

| Komponen | Perintah Instalasi | Deskripsi |
|----------|-------------------|-----------|
| Dialog | `npx shadcn-ui@latest add dialog` | Modal dialog |
| Alert Dialog | `npx shadcn-ui@latest add alert-dialog` | Confirmation dialog |
| Popover | `npx shadcn-ui@latest add popover` | Popover content |
| Tooltip | `npx shadcn-ui@latest add tooltip` | Tooltip pada hover |
| Dropdown Menu | `npx shadcn-ui@latest add dropdown-menu` | Dropdown menu |
| Context Menu | `npx shadcn-ui@latest add context-menu` | Right-click context menu |
| Hover Card | `npx shadcn-ui@latest add hover-card` | Card yang muncul saat hover |
| Menubar | `npx shadcn-ui@latest add menubar` | Horizontal menu bar |

### 6. Data Display Components

| Komponen | Perintah Instalasi | Deskripsi |
|----------|-------------------|-----------|
| Table | `npx shadcn-ui@latest add table` | Table dasar |
| Data Table | `npx shadcn-ui@latest add data-table` | Advanced table dengan sorting/filtering |
| Avatar | `npx shadcn-ui@latest add avatar` | Avatar/profile picture |
| Calendar | `npx shadcn-ui@latest add calendar` | Calendar picker |
| Carousel | `npx shadcn-ui@latest add carousel` | Image/content carousel |
| Collapsible | `npx shadcn-ui@latest add collapsible` | Collapsible content |
| Accordion | `npx shadcn-ui@latest add accordion` | Accordion menu |

### 7. Date & Time Components

| Komponen | Perintah Instalasi | Deskripsi |
|----------|-------------------|-----------|
| Date Picker | `npx shadcn-ui@latest add date-picker` | Date picker input |
| Range Calendar | `npx shadcn-ui@latest add range-calendar` | Date range picker |

### 8. Advanced Components

| Komponen | Perintah Instalasi | Deskripsi |
|----------|-------------------|-----------|
| Combobox | `npx shadcn-ui@latest add combobox` | Searchable select |
| Toggle | `npx shadcn-ui@latest add toggle` | Toggle button |
| Toggle Group | `npx shadcn-ui@latest add toggle-group` | Group of toggle buttons |
| Resizable | `npx shadcn-ui@latest add resizable` | Resizable panels |
| Sonner | `npx shadcn-ui@latest add sonner` | Alternative toast system |
| Drawer | `npx shadcn-ui@latest add drawer` | Bottom drawer/sheet |

## Tips Instalasi

| Tipe Instalasi | Perintah | Deskripsi |
|----------------|----------|-----------|
| Multiple Komponen | `npx shadcn-ui@latest add button input card dialog` | Instal beberapa komponen sekaligus |
| Semua Komponen | `npx shadcn-ui@latest add --all` | Instal semua komponen yang tersedia |
| Cek Komponen | `npx shadcn-ui@latest add --help` | Lihat daftar komponen yang tersedia |
| Update Komponen | `npx shadcn-ui@latest add [nama-komponen] --overwrite` | Update komponen yang sudah ada |
| Force Install | `npx shadcn-ui@latest add [nama-komponen] --force` | Paksa instal jika ada masalah |

## Package Kombinasi yang Sering Digunakan

| Package | Komponen | Perintah |
|---------|----------|----------|
| Form Package | Form, Input, Button, Label | `npx shadcn-ui@latest add form input button label` |
| Dialog Package | Dialog, Button | `npx shadcn-ui@latest add dialog button` |
| Data Table Package | Table, Button, Dropdown Menu | `npx shadcn-ui@latest add table button dropdown-menu` |
| Navigation Package | Navigation Menu, Button | `npx shadcn-ui@latest add navigation-menu button` |
| Card Package | Card, Button, Badge | `npx shadcn-ui@latest add card button badge` |
| Toast Package | Toast, Button | `npx shadcn-ui@latest add toast button` |

## Struktur File Setelah Instalasi

```
src/
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── input.tsx
│       ├── card.tsx
│       └── ... (komponen lainnya)
└── lib/
    └── utils.ts
```

## Quick Reference - Import & Usage

| Komponen | Import | Basic Usage |
|----------|--------|-------------|
| Button | `import { Button } from "@/components/ui/button"` | `<Button>Click me</Button>` |
| Input | `import { Input } from "@/components/ui/input"` | `<Input placeholder="Enter text" />` |
| Card | `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"` | `<Card><CardHeader><CardTitle>Title</CardTitle></CardHeader></Card>` |
| Dialog | `import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"` | `<Dialog><DialogTrigger>Open</DialogTrigger><DialogContent>Content</DialogContent></Dialog>` |
| Alert | `import { Alert, AlertDescription } from "@/components/ui/alert"` | `<Alert><AlertDescription>Message</AlertDescription></Alert>` |

## Dependency yang Otomatis Terinstal

| Dependency | Fungsi |
|------------|---------|
| `@radix-ui/react-*` | Base komponen dari Radix UI |
| `lucide-react` | Icon library |
| `class-variance-authority` | Styling variants |
| `clsx` | Conditional classes |
| `tailwind-merge` | Merging Tailwind classes |

## Troubleshooting

| Masalah | Solusi | Perintah |
|---------|--------|----------|
| Komponen tidak ditemukan | Force install | `npx shadcn-ui@latest add [nama-komponen] --force` |
| Konflik file | Overwrite | `npx shadcn-ui@latest add [nama-komponen] --overwrite` |
| Update ke versi terbaru | Cek diff | `npx shadcn-ui@latest diff` |
| Dependency error | Reinstall | `npm install` atau `yarn install` |

---

*Dokumentasi ini mencakup semua komponen utama shadcn/ui yang tersedia. Pastikan project Anda sudah di-setup dengan shadcn/ui sebelum menginstal komponen-komponen ini.*