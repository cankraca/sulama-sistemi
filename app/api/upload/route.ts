import { writeFile, rename, unlink } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { tmpdir } from "os";
import { join } from "path";

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const tempDir = tmpdir();
    const publicDir = join('public', 'img');

    if (!file) {
        return NextResponse.json({success: false})
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = join(tempDir, file.name);
    const publicPath = join(publicDir, file.name);
    
    try {
        await writeFile(path, buffer);
        await rename(path, publicPath);
        return NextResponse.json({success: true, path: file.name});
    } catch (error: any) {
        console.error("Error moving file: ", error);
        return NextResponse.json({success: false, error:error.message})
    }

}

export async function DELETE(request: NextRequest) {
    const { fileName } = await request.json();
    const filePath = join('public', fileName);
    
    try {
        await unlink(filePath);
        return NextResponse.json({ success: true, message: `${fileName} successfully deleted` });
    } catch (error: any) {
        console.error("Error deleting file: ", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}