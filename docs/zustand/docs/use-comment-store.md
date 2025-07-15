# Comment Store

Zustand store untuk mengelola state komentar dan balasan pada tiket sistem.

## Dependencies

```bash
npm install zustand
```

## Features

- **Reply Management**: Mengelola balasan komentar dengan caching
- **Edit State**: Tracking komentar yang sedang diedit
- **Async Operations**: Mendukung operasi asynchronous untuk fetching data
- **Debug Helper**: Utility untuk debugging replies

## Store Interface

```typescript
interface CommentStore {
  replies: Record<string, CommentType[]>;
  editingCommentId: string | null;
  setEditingCommentId: (id: string | null) => void;
  fetchReplies: (commentId: string) => Promise<void>;
  printReplies: (commentId: string) => Promise<void>;
}
```

## State Properties

### `replies`
**Type:** `Record<string, CommentType[]>`
**Description:** Object yang menyimpan daftar balasan untuk setiap komentar berdasarkan comment ID

### `editingCommentId`
**Type:** `string | null`
**Description:** ID komentar yang sedang dalam mode edit

## Actions

### `setEditingCommentId(id: string | null)`
Mengatur komentar mana yang sedang dalam mode edit.

**Parameters:**
- `id` - ID komentar yang akan diedit, atau `null` untuk membatalkan edit

**Usage:**
```typescript
const { setEditingCommentId } = useCommentStore();

// Mulai edit komentar
setEditingCommentId("comment-123");

// Batalkan edit
setEditingCommentId(null);
```

### `fetchReplies(commentId: string)`
Mengambil balasan untuk komentar tertentu dari server dan menyimpannya dalam state.

**Parameters:**
- `commentId` - ID komentar yang akan diambil balasannya

**Returns:** `Promise<void>`

**Usage:**
```typescript
const { fetchReplies } = useCommentStore();

await fetchReplies("comment-123");
```

### `printReplies(commentId: string)`
Utility function untuk debugging yang mencetak balasan komentar ke console.

**Parameters:**
- `commentId` - ID komentar yang akan di-debug

**Returns:** `Promise<void>`

**Usage:**
```typescript
const { printReplies } = useCommentStore();

await printReplies("comment-123");
```

## Types

### `CommentType`
```typescript
export type CommentType = {
  id: string
  ticketId?: string
  userId: string
  userName: string
  userImage: string
  itMostHelpful: boolean
  userRole: string
  comment: string
  imageUrl: string
  createdAt: string
  parentCommentId: string
}
```

### `CommentsReturn`
```typescript
export interface CommentsReturn extends ActionResult {
  comments?: CommentType[]
}
```

### `CommentReturn`
```typescript
export interface CommentReturn extends ActionResult {
  comment?: CommentType
}
```

## Sample Data

### Sample Comment Data
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "ticketId": "550e8400-e29b-41d4-a716-446655440001",
  "userId": "550e8400-e29b-41d4-a716-446655440002",
  "userName": "John Doe",
  "userImage": "https://avatar.iran.liara.run/public/boy",
  "itMostHelpful": false,
  "userRole": "Developer",
  "comment": "Saya sudah mencoba solusi ini dan berhasil mengatasi masalah yang sama.",
  "imageUrl": "https://example.com/screenshot.png",
  "createdAt": "2024-01-15T10:30:00Z",
  "parentCommentId": ""
}
```

### Sample Reply Data
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440003",
  "ticketId": "550e8400-e29b-41d4-a716-446655440001",
  "userId": "550e8400-e29b-41d4-a716-446655440004",
  "userName": "Jane Smith",
  "userImage": "https://avatar.iran.liara.run/public/girl",
  "itMostHelpful": true,
  "userRole": "Manager",
  "comment": "Terima kasih untuk solusinya! Ini sangat membantu.",
  "imageUrl": "",
  "createdAt": "2024-01-15T11:15:00Z",
  "parentCommentId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### Sample Store State
```json
{
  "replies": {
    "550e8400-e29b-41d4-a716-446655440000": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440003",
        "userName": "Jane Smith",
        "userImage": "https://avatar.iran.liara.run/public/girl",
        "itMostHelpful": true,
        "userRole": "Manager",
        "comment": "Terima kasih untuk solusinya!",
        "imageUrl": "",
        "createdAt": "2024-01-15T11:15:00Z",
        "parentCommentId": "550e8400-e29b-41d4-a716-446655440000"
      }
    ]
  },
  "editingCommentId": null
}
```

## Usage Examples

### Basic Usage
```typescript
import { useCommentStore } from "@/store/comment-store";

function CommentComponent() {
  const { 
    replies, 
    editingCommentId, 
    setEditingCommentId, 
    fetchReplies 
  } = useCommentStore();

  const handleLoadReplies = async (commentId: string) => {
    await fetchReplies(commentId);
  };

  const handleEditComment = (commentId: string) => {
    setEditingCommentId(commentId);
  };

  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}
```

### Advanced Usage with Error Handling
```typescript
const handleFetchReplies = async (commentId: string) => {
  try {
    await fetchReplies(commentId);
    const commentReplies = replies[commentId];
    console.log(`Loaded ${commentReplies?.length || 0} replies`);
  } catch (error) {
    console.error('Failed to fetch replies:', error);
  }
};
```

## Source Code

```typescript
import { getRepliesByCommentId } from "@/@data/ticket-comment";
import { CommentType } from "@/@types/ticket-comment";
import { create } from "zustand";

/**
 * Store untuk mengelola state komentar dan balasan tiket
 */
interface CommentStore {
  replies: Record<string, CommentType[]>;
  editingCommentId: string | null;
  setEditingCommentId: (id: string | null) => void;
  fetchReplies: (commentId: string) => Promise<void>;
  printReplies: (commentId: string) => Promise<void>;
}

export const useCommentStore = create<CommentStore>((set, get) => ({
  replies: {},
  editingCommentId: null,

  /**
   * Mengatur komentar yang sedang dalam mode edit
   * @param id - ID komentar yang akan diedit atau null untuk membatalkan
   */
  setEditingCommentId: (id: string | null) => set({ editingCommentId: id }),
  
  /**
   * Mengambil balasan untuk komentar tertentu dari server
   * @param commentId - ID komentar yang akan diambil balasannya
   */
  fetchReplies: async (commentId: string) => {
    const res = await getRepliesByCommentId(commentId);
    if (res.success) {
      set((state) => ({
        replies: {
          ...state.replies,
          [commentId]: res.comments || [],
        },
      }));
    }
  },

  /**
   * Utility untuk debugging - mencetak balasan komentar ke console
   * @param commentId - ID komentar yang akan di-debug
   */
  printReplies: async (commentId: string) => {
    const existingReplies = get().replies[commentId];
    if (!existingReplies || existingReplies.length === 0) {
      console.log(`No replies for comment ID: ${commentId}`);
    } else {
      console.log(`Replies for comment ID: ${commentId}:`);
    }
  },
}));
```