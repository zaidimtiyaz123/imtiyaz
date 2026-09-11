import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', '..', 'data', 'crate_projects.db');

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT,
    service TEXT NOT NULL,
    budget TEXT NOT NULL,
    timeline TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
  CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
  CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
`);

export interface ContactInquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export function createContactInquiry(data: Omit<ContactInquiry, 'id' | 'status' | 'created_at' | 'updated_at'>): ContactInquiry {
  const stmt = db.prepare(`
    INSERT INTO contacts (name, email, phone, company, service, budget, timeline, message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(
    data.name,
    data.email,
    data.phone,
    data.company || null,
    data.service,
    data.budget,
    data.timeline,
    data.message
  );

  const inquiry = db.prepare('SELECT * FROM contacts WHERE id = ?').get(result.lastInsertRowid) as ContactInquiry;
  return inquiry;
}

export function getContactInquiries(): ContactInquiry[] {
  return db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all() as ContactInquiry[];
}

export function getContactInquiryById(id: number): ContactInquiry | undefined {
  return db.prepare('SELECT * FROM contacts WHERE id = ?').get(id) as ContactInquiry | undefined;
}

export function updateContactStatus(id: number, status: string): void {
  db.prepare('UPDATE contacts SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(status, id);
}

export default db;