import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// 创建邮件传输器
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // 使用SSL
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: Request) {
  try {
    // 检查环境变量
    if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.RECIPIENT_EMAIL) {
      console.error('环境变量未正确配置:', {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS ? '已配置' : '未配置',
        recipient: process.env.RECIPIENT_EMAIL
      });
      return NextResponse.json(
        { error: '邮件服务器配置错误' },
        { status: 500 }
      );
    }

    const { name, email, message } = await request.json();

    // 验证输入
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '请填写所有必填字段' },
        { status: 400 }
      );
    }

    // 邮件内容
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `来自精艺控股的留言 - ${name}`,
      html: `
        <h2>你有一条新的留言信息</h2>
        <p><strong>姓名：</strong> ${name}</p>
        <p><strong>邮箱：</strong> ${email}</p>
        <p><strong>留言内容：</strong></p>
        <p>${message}</p>
      `,
    };

    console.log('正在发送邮件...', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    // 发送邮件
    await transporter.sendMail(mailOptions);
    console.log('邮件发送成功');
    return NextResponse.json({ 
      success: true,
      message: '邮件发送成功'
    }, { status: 200 });
  } catch (error) {
    console.error('发送邮件失败:', error);
    return NextResponse.json({ 
      success: false,
      error: '发送失败',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  }
} 