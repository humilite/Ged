export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager' | 'user';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Metadata {
  key: string;
  value: string | number | boolean | Date;
}

export interface ClassificationPlan {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  children?: ClassificationPlan[];
}

export interface Document {
  id: string;
  title: string;
  description?: string;
  confidentialityLevel: 'public' | 'confidential' | 'secret';
  classificationId: string;
  authorId: string;
  uploadDate: string;
  fileUrl: string;
  metadata: Metadata[];
  status: 'draft' | 'published' | 'archived';
}

export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface UserFormProps {
  user: Partial<User>;
  onSave: (user: User) => void;
  onCancel: () => void;
}

export interface DocumentFormProps {
  document: Partial<Document>;
  onSave: (document: Document) => void;
  onCancel: () => void;
}

export interface SearchFilter {
  field: string;
  value: string | number | boolean | undefined;
}

export interface LoginFormState {
  email: string;
  password: string;
  error?: string;
  loading: boolean;
}
