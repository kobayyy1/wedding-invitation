import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = (formData.get('name') as string) || '';
    const message = (formData.get('message') as string) || '';
    const file = formData.get('proof') as File | null;

    if (!name.trim() || !message.trim()) {
      return NextResponse.json(
        { error: 'Nama dan doa restu wajib diisi.' },
        { status: 400 }
      );
    }

    let proofUrl = '';

    // Simpan file bukti transfer jika ada
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(uploadsDir, { recursive: true });

      const safeFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = path.join(uploadsDir, safeFileName);

      await fs.writeFile(filePath, buffer);
      proofUrl = `/uploads/${safeFileName}`;
    }

    // Siapkan data entri
    const newEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      proofUrl,
      createdAt: new Date().toISOString(),
    };

    // Simpan ke database lokal JSON
    const dataDir = path.join(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });
    const dbPath = path.join(dataDir, 'tanda-kasih.json');

    let currentData = [];
    try {
      const existing = await fs.readFile(dbPath, 'utf-8');
      currentData = JSON.parse(existing);
    } catch {
      currentData = [];
    }

    currentData.unshift(newEntry);
    await fs.writeFile(dbPath, JSON.stringify(currentData, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Data tanda kasih berhasil disimpan.',
      data: newEntry,
    });
  } catch (error) {
    console.error('Gagal menyimpan tanda kasih:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server saat menyimpan data.' },
      { status: 500 }
    );
  }
}