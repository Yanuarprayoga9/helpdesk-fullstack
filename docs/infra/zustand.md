# Dokumentasi Lengkap Zustand

## 1. Instalasi & Setup

| Package | Deskripsi | Instalasi |
|---------|-----------|-----------|
| `zustand` | Core library | `npm install zustand` |
| `immer` | Immutable updates (optional) | `npm install immer` |
| `subscriptions-transport-ws` | WebSocket support | `npm install subscriptions-transport-ws` |

## 2. Basic Store Creation

| Method | Deskripsi | Contoh Penggunaan |
|--------|-----------|-------------------|
| `create()` | Membuat store dasar | `const useStore = create((set) => ({ count: 0, increment: () => set((state) => ({ count: state.count + 1 })) }))` |
| `set()` | Update state | `set({ count: 1 })` |
| `get()` | Akses state dalam actions | `get().count` |
| `setState()` | Update state dari luar | `useStore.setState({ count: 5 })` |
| `getState()` | Get state dari luar | `const count = useStore.getState().count` |

## 3. State Updates

| Pattern | Deskripsi | Contoh Penggunaan |
|---------|-----------|-------------------|
| Direct update | Update langsung | `set({ count: 10 })` |
| Functional update | Update dengan function | `set((state) => ({ count: state.count + 1 }))` |
| Partial update | Update sebagian state | `set({ name: "John" })` |
| Merge update | Merge dengan existing state | `set((state) => ({ ...state, newField: "value" }))` |
| Replace update | Replace entire state | `set(() => ({ count: 0 }), true)` |

## 4. Selectors

| Selector Type | Deskripsi | Contoh Penggunaan |
|---------------|-----------|-------------------|
| Property selector | Select specific property | `const count = useStore((state) => state.count)` |
| Computed selector | Select computed value | `const doubled = useStore((state) => state.count * 2)` |
| Multiple selector | Select multiple values | `const { count, name } = useStore((state) => ({ count: state.count, name: state.name }))` |
| Custom selector | Custom selector function | `const isEven = useStore((state) => state.count % 2 === 0)` |

## 5. Actions

| Action Type | Deskripsi | Contoh Penggunaan |
|-------------|-----------|-------------------|
| Sync action | Synchronous action | `increment: () => set((state) => ({ count: state.count + 1 }))` |
| Async action | Asynchronous action | `fetchData: async () => { const data = await api.getData(); set({ data }) }` |
| Action with params | Action dengan parameter | `setName: (name) => set({ name })` |
| Complex action | Action dengan logic kompleks | `reset: () => set({ count: 0, name: "", data: null })` |

## 6. Middleware

| Middleware | Deskripsi | Contoh Penggunaan |
|------------|-----------|-------------------|
| `persist` | Persist state ke storage | `persist((set, get) => ({ ... }), { name: "storage-name" })` |
| `devtools` | Redux DevTools integration | `devtools((set, get) => ({ ... }), { name: "store-name" })` |
| `immer` | Immutable updates dengan Immer | `immer((set) => ({ increment: () => set((state) => { state.count++ }) }))` |
| `subscribeWithSelector` | Subscribe dengan selector | `subscribeWithSelector((set, get) => ({ ... }))` |
| `redux` | Redux-like pattern | `redux(reducer, initialState)` |

## 7. Persistence

| Storage Type | Deskripsi | Contoh Penggunaan |
|--------------|-----------|-------------------|
| `localStorage` | Browser localStorage | `persist(store, { name: "my-store" })` |
| `sessionStorage` | Browser sessionStorage | `persist(store, { name: "my-store", storage: createJSONStorage(() => sessionStorage) })` |
| `AsyncStorage` | React Native AsyncStorage | `persist(store, { name: "my-store", storage: createJSONStorage(() => AsyncStorage) })` |
| Custom storage | Custom storage adapter | `persist(store, { name: "my-store", storage: customStorage })` |

## 8. Subscriptions

| Method | Deskripsi | Contoh Penggunaan |
|--------|-----------|-------------------|
| `subscribe()` | Subscribe to state changes | `const unsubscribe = useStore.subscribe((state) => console.log(state))` |
| `subscribeWithSelector()` | Subscribe dengan selector | `const unsubscribe = useStore.subscribe((state) => state.count, (count) => console.log(count))` |
| Cleanup | Cleanup subscription | `useEffect(() => { const unsub = store.subscribe(...); return unsub }, [])` |

## 9. TypeScript Support

| Type | Deskripsi | Contoh Penggunaan |
|------|-----------|-------------------|
| Store interface | Interface untuk store | `interface Store { count: number; increment: () => void }` |
| Typed create | Typed store creation | `const useStore = create<Store>((set) => ({ ... }))` |
| Typed selector | Typed selector | `const count: number = useStore((state) => state.count)` |
| Generic store | Generic store type | `const useStore = create<T>((set, get) => ({ ... }))` |

## 10. Store Composition

| Pattern | Deskripsi | Contoh Penggunaan |
|---------|-----------|-------------------|
| Store slicing | Membagi store menjadi slice | `const createCounterSlice = (set, get) => ({ count: 0, increment: () => set(...) })` |
| Store combining | Menggabungkan multiple stores | `const useStore = create((...a) => ({ ...createCounterSlice(...a), ...createUserSlice(...a) }))` |
| Store inheritance | Store inheritance pattern | `const useChildStore = create((set, get) => ({ ...useParentStore.getState(), ... }))` |

## 11. Context Usage

| Pattern | Deskripsi | Contoh Penggunaan |
|---------|-----------|-------------------|
| Context provider | Store dalam context | `const StoreContext = createContext(null)` |
| Multiple stores | Multiple store instances | `const useStore = () => useContext(StoreContext)` |
| Store per component | Store instance per component | `const [store] = useState(() => createStore())` |

## 12. Contoh Implementasi Lengkap

### Counter Store (Basic)
```typescript
import { create } from 'zustand'

interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 })
}))

// Usage
function Counter() {
  const { count, increment, decrement, reset } = useCounterStore()
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
```

### Todo Store (Complex)
```typescript
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

interface TodoState {
  todos: Todo[]
  filter: 'all' | 'active' | 'completed'
  addTodo: (text: string) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  setFilter: (filter: 'all' | 'active' | 'completed') => void
  clearCompleted: () => void
  filteredTodos: Todo[]
}

const useTodoStore = create<TodoState>()(
  devtools(
    persist(
      (set, get) => ({
        todos: [],
        filter: 'all',
        
        addTodo: (text: string) => {
          const newTodo: Todo = {
            id: Date.now().toString(),
            text,
            completed: false,
            createdAt: new Date()
          }
          set((state) => ({
            todos: [...state.todos, newTodo]
          }))
        },
        
        toggleTodo: (id: string) => {
          set((state) => ({
            todos: state.todos.map(todo =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
          }))
        },
        
        deleteTodo: (id: string) => {
          set((state) => ({
            todos: state.todos.filter(todo => todo.id !== id)
          }))
        },
        
        setFilter: (filter) => set({ filter }),
        
        clearCompleted: () => {
          set((state) => ({
            todos: state.todos.filter(todo => !todo.completed)
          }))
        },
        
        get filteredTodos() {
          const { todos, filter } = get()
          switch (filter) {
            case 'active':
              return todos.filter(todo => !todo.completed)
            case 'completed':
              return todos.filter(todo => todo.completed)
            default:
              return todos
          }
        }
      }),
      {
        name: 'todo-store',
        partialize: (state) => ({ todos: state.todos })
      }
    ),
    { name: 'todo-store' }
  )
)
```

### User Store dengan API
```typescript
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
}

interface UserState {
  users: User[]
  currentUser: User | null
  loading: boolean
  error: string | null
  fetchUsers: () => Promise<void>
  createUser: (user: Omit<User, 'id'>) => Promise<void>
  updateUser: (id: string, updates: Partial<User>) => Promise<void>
  deleteUser: (id: string) => Promise<void>
  setCurrentUser: (user: User | null) => void
}

const useUserStore = create<UserState>()(
  devtools(
    (set, get) => ({
      users: [],
      currentUser: null,
      loading: false,
      error: null,
      
      fetchUsers: async () => {
        set({ loading: true, error: null })
        try {
          const response = await fetch('/api/users')
          const users = await response.json()
          set({ users, loading: false })
        } catch (error) {
          set({ error: error.message, loading: false })
        }
      },
      
      createUser: async (userData) => {
        set({ loading: true, error: null })
        try {
          const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
          })
          const newUser = await response.json()
          set((state) => ({
            users: [...state.users, newUser],
            loading: false
          }))
        } catch (error) {
          set({ error: error.message, loading: false })
        }
      },
      
      updateUser: async (id, updates) => {
        set({ loading: true, error: null })
        try {
          const response = await fetch(`/api/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
          })
          const updatedUser = await response.json()
          set((state) => ({
            users: state.users.map(user => 
              user.id === id ? updatedUser : user
            ),
            loading: false
          }))
        } catch (error) {
          set({ error: error.message, loading: false })
        }
      },
      
      deleteUser: async (id) => {
        set({ loading: true, error: null })
        try {
          await fetch(`/api/users/${id}`, { method: 'DELETE' })
          set((state) => ({
            users: state.users.filter(user => user.id !== id),
            loading: false
          }))
        } catch (error) {
          set({ error: error.message, loading: false })
        }
      },
      
      setCurrentUser: (user) => set({ currentUser: user })
    }),
    { name: 'user-store' }
  )
)
```

### Store dengan Immer
```typescript
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface NestedState {
  user: {
    profile: {
      name: string
      settings: {
        theme: 'light' | 'dark'
        notifications: boolean
      }
    }
  }
  updateName: (name: string) => void
  toggleTheme: () => void
  toggleNotifications: () => void
}

const useNestedStore = create<NestedState>()(
  immer((set) => ({
    user: {
      profile: {
        name: 'John Doe',
        settings: {
          theme: 'light',
          notifications: true
        }
      }
    },
    
    updateName: (name) => set((state) => {
      state.user.profile.name = name
    }),
    
    toggleTheme: () => set((state) => {
      state.user.profile.settings.theme = 
        state.user.profile.settings.theme === 'light' ? 'dark' : 'light'
    }),
    
    toggleNotifications: () => set((state) => {
      state.user.profile.settings.notifications = 
        !state.user.profile.settings.notifications
    })
  }))
)
```

## 13. Performance Optimization

| Technique | Deskripsi | Contoh Penggunaan |
|-----------|-----------|-------------------|
| Selector optimization | Optimasi selector | `const count = useStore(useCallback((state) => state.count, []))` |
| Shallow comparison | Shallow comparison untuk object | `const { a, b } = useStore((state) => ({ a: state.a, b: state.b }), shallow)` |
| Subscription splitting | Split subscriptions | `const count = useStore((state) => state.count)` |
| Memoization | Memoize expensive operations | `const expensiveValue = useMemo(() => computeExpensive(data), [data])` |

## 14. Testing

| Test Type | Deskripsi | Contoh Penggunaan |
|-----------|-----------|-------------------|
| Unit testing | Test store logic | `const store = createStore(); store.getState().increment(); expect(store.getState().count).toBe(1)` |
| Component testing | Test dengan component | `render(<Counter />); fireEvent.click(screen.getByText('+')); expect(screen.getByText('1')).toBeInTheDocument()` |
| Mock store | Mock store untuk testing | `const mockStore = create(() => ({ count: 0, increment: vi.fn() }))` |

## 15. Error Handling

| Pattern | Deskripsi | Contoh Penggunaan |
|---------|-----------|-------------------|
| Try-catch | Error handling dalam actions | `try { await api.call() } catch (error) { set({ error: error.message }) }` |
| Error boundary | React error boundary | `<ErrorBoundary><Component /></ErrorBoundary>` |
| Error state | Error state management | `set({ error: null, loading: true })` |

## 16. Best Practices

| Practice | Deskripsi | Contoh |
|----------|-----------|---------|
| Small stores | Buat store kecil dan focused | Pisahkan user store dan todo store |
| Immutable updates | Selalu update state secara immutable | `set((state) => ({ ...state, count: state.count + 1 }))` |
| Action naming | Gunakan nama action yang jelas | `increment`, `fetchUsers`, `toggleTodo` |
| TypeScript | Gunakan TypeScript untuk type safety | Interface untuk state dan actions |
| Devtools | Gunakan devtools untuk debugging | `devtools(store, { name: 'my-store' })` |

## Tips Penggunaan

1. **Gunakan selector yang spesifik**: Hanya select data yang diperlukan
2. **Avoid over-normalization**: Jangan terlalu kompleks seperti Redux
3. **Use middleware**: Manfaatkan middleware untuk fitur tambahan
4. **Persist important data**: Gunakan persist untuk data penting
5. **Test your stores**: Selalu test store logic
6. **Use TypeScript**: Untuk type safety dan better DX
7. **Split large stores**: Bagi store besar menjadi slice-slice kecil
8. **Handle loading states**: Selalu handle loading dan error states