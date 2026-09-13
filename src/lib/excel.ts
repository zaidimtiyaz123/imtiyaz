import ExcelJS from 'exceljs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXCEL_FILE_PATH = path.join(__dirname, '..', '..', 'data', 'crate_projects_leads.xlsx');
const LOCK_FILE_PATH = EXCEL_FILE_PATH + '.lock';

const CONTACT_HEADERS = [
  { header: 'ID', key: 'id', width: 8 },
  { header: 'Name', key: 'name', width: 25 },
  { header: 'Email', key: 'email', width: 35 },
  { header: 'Phone', key: 'phone', width: 20 },
  { header: 'Company', key: 'company', width: 25 },
  { header: 'Service', key: 'service', width: 25 },
  { header: 'Budget', key: 'budget', width: 20 },
  { header: 'Timeline', key: 'timeline', width: 20 },
  { header: 'Message', key: 'message', width: 50 },
  { header: 'Status', key: 'status', width: 15 },
  { header: 'Created At', key: 'created_at', width: 22 },
  { header: 'Updated At', key: 'updated_at', width: 22 },
];

const NEWSLETTER_HEADERS = [
  { header: 'ID', key: 'id', width: 8 },
  { header: 'Email', key: 'email', width: 35 },
  { header: 'Subscribed At', key: 'subscribed_at', width: 22 },
];

let isLocked = false;
const lockQueue: Array<() => void> = [];

async function acquireLock(): Promise<void> {
  return new Promise((resolve) => {
    if (!isLocked) {
      isLocked = true;
      fs.writeFileSync(LOCK_FILE_PATH, process.pid.toString());
      resolve();
    } else {
      lockQueue.push(resolve);
    }
  });
}

function releaseLock(): void {
  if (lockQueue.length > 0) {
    const next = lockQueue.shift();
    if (next) next();
  } else {
    isLocked = false;
    try {
      fs.unlinkSync(LOCK_FILE_PATH);
    } catch {
      // Lock file might not exist
    }
  }
}

async function withLock<T>(fn: () => Promise<T>): Promise<T> {
  await acquireLock();
  try {
    return await fn();
  } finally {
    releaseLock();
  }
}

async function getOrCreateWorkbook(): Promise<ExcelJS.Workbook> {
  const workbook = new ExcelJS.Workbook();
  
  try {
    await workbook.xlsx.readFile(EXCEL_FILE_PATH);
  } catch {
    workbook.addWorksheet('Contact Inquiries');
    workbook.addWorksheet('Newsletter Subscriptions');
  }
  
  return workbook;
}

function ensureContactSheet(workbook: ExcelJS.Workbook): ExcelJS.Worksheet {
  let sheet = workbook.getWorksheet('Contact Inquiries');
  if (!sheet) {
    sheet = workbook.addWorksheet('Contact Inquiries');
    sheet.columns = CONTACT_HEADERS;
    sheet.getRow(1).font = { bold: true };
    sheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF0EA5E9' },
    };
    sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.views = [{ state: 'frozen', ySplit: 1 }];
  }
  return sheet;
}

function ensureNewsletterSheet(workbook: ExcelJS.Workbook): ExcelJS.Worksheet {
  let sheet = workbook.getWorksheet('Newsletter Subscriptions');
  if (!sheet) {
    sheet = workbook.addWorksheet('Newsletter Subscriptions');
    sheet.columns = NEWSLETTER_HEADERS;
    sheet.getRow(1).font = { bold: true };
    sheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF10B981' },
    };
    sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.views = [{ state: 'frozen', ySplit: 1 }];
  }
  return sheet;
}

function getNextId(sheet: ExcelJS.Worksheet): number {
  let maxId = 0;
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const id = row.getCell(1).value as number;
    if (typeof id === 'number' && id > maxId) {
      maxId = id;
    }
  });
  return maxId + 1;
}

export async function appendContactInquiry(data: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}): Promise<void> {
  await withLock(async () => {
    const workbook = await getOrCreateWorkbook();
    const sheet = ensureContactSheet(workbook);
    
    const nextId = getNextId(sheet);
    
    const row = sheet.addRow({
      id: nextId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company || '',
      service: data.service,
      budget: data.budget,
      timeline: data.timeline,
      message: data.message,
      status: 'new',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.alignment = { vertical: 'middle', wrapText: true };
    });
    
    await workbook.xlsx.writeFile(EXCEL_FILE_PATH);
  });
}

export async function appendNewsletterSubscription(email: string): Promise<void> {
  await withLock(async () => {
    const workbook = await getOrCreateWorkbook();
    const sheet = ensureNewsletterSheet(workbook);
    
    const existingEmail = sheet.getColumn('email').values.some((val) => val === email);
    if (existingEmail) {
      return;
    }
    
    const nextId = getNextId(sheet);
    
    const row = sheet.addRow({
      id: nextId,
      email: email,
      subscribed_at: new Date().toISOString(),
    });
    
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.alignment = { vertical: 'middle' };
    });
    
    await workbook.xlsx.writeFile(EXCEL_FILE_PATH);
  });
}

export async function getContactInquiriesFromExcel(): Promise<any[]> {
  return withLock(async () => {
    const workbook = await getOrCreateWorkbook();
    const sheet = ensureContactSheet(workbook);
    
    const results: any[] = [];
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const rowData: any = {};
      row.eachCell((cell, colNumber) => {
        const header = sheet.getRow(1).getCell(colNumber).value as string;
        if (typeof header === 'string') {
          rowData[header] = cell.value;
        }
      });
      results.push(rowData);
    });
    
    return results;
  });
}

export async function getNewsletterSubscriptionsFromExcel(): Promise<any[]> {
  return withLock(async () => {
    const workbook = await getOrCreateWorkbook();
    const sheet = ensureNewsletterSheet(workbook);
    
    const results: any[] = [];
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const rowData: any = {};
      row.eachCell((cell, colNumber) => {
        const header = sheet.getRow(1).getCell(colNumber).value as string;
        if (typeof header === 'string') {
          rowData[header] = cell.value;
        }
      });
      results.push(rowData);
    });
    
    return results;
  });
}

export const EXCEL_FILE_PATH_CONST = EXCEL_FILE_PATH;