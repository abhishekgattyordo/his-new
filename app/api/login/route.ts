

// import { NextRequest, NextResponse } from 'next/server';
// import { query } from '../../../lib/db';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// // ==================== INTERFACES ====================

// interface LoginPayload {
//   email: string;
//   password: string;
// }

// interface User {
//   id: number;
//   email: string;
//   password: string;
//   full_name_en: string;
//   role: string;
//   patient_id?: string;
//   created_at: Date;
// }

// // ==================== HELPER FUNCTIONS ====================

// /**
//  * Generate JWT token
//  */
// function generateToken(user: Partial<User>): string {
//   const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
  
//   return jwt.sign(
//     {
//       id: user.id,
//       email: user.email,
//       role: user.role,
//       patientId: user.patient_id
//     },
//     JWT_SECRET,
//     { expiresIn: '7d' }
//   );
// }

// /**
//  * Validate login input
//  */
// function validateInput(data: any): { isValid: boolean; errors: { email?: string; password?: string } } {
//   const errors: { email?: string; password?: string } = {};

//   if (!data.email?.trim()) {
//     errors.email = "Email or Patient ID is required";
//   }

//   if (!data.password) {
//     errors.password = "Password is required";
//   } else if (data.password.length < 6) {
//     errors.password = "Password must be at least 6 characters";
//   }

//   return {
//     isValid: Object.keys(errors).length === 0,
//     errors
//   };
// }

// // ==================== POST ENDPOINT ====================

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { email, password } = body as LoginPayload;

//     // Validate input
//     const validation = validateInput(body);
//     if (!validation.isValid) {
//       return NextResponse.json(
//         { 
//           success: false, 
//           message: "Validation failed", 
//           errors: validation.errors 
//         },
//         { status: 400 }
//       );
//     }

//     console.log(`🔍 Login attempt for: ${email}`);

//     // Determine if input is email or patient ID
//     const isEmail = email.includes('@');
    
//     let userResult;
    
//     if (isEmail) {
//       // Search by email
//       userResult = await query(
//         'SELECT id, email, password, full_name_en, role, patient_id, created_at FROM users WHERE email = $1',
//         [email.toLowerCase()]
//       );
//     } else {
//       // Search by patient ID (for patients)
//       userResult = await query(
//         'SELECT id, email, password, full_name_en, role, patient_id, created_at FROM users WHERE patient_id = $1',
//         [email]
//       );
//     }

//     const users = userResult.rows;

//     if (users.length === 0) {
//       return NextResponse.json(
//         { 
//           success: false, 
//           message: "Invalid email/patient ID or password" 
//         },
//         { status: 401 }
//       );
//     }

//     const user = users[0];

//     // Verify password
//     const isValidPassword = await bcrypt.compare(password, user.password);

//     if (!isValidPassword) {
//       return NextResponse.json(
//         { 
//           success: false, 
//           message: "Invalid email/patient ID or password" 
//         },
//         { status: 401 }
//       );
//     }

//     // Generate JWT token
//     const token = generateToken(user);

//     // Remove password from response
//     const { password: _, ...userWithoutPassword } = user;

//     // Set cookie for authentication
//     const response = NextResponse.json({
//       success: true,
//       message: "Login successful",
//       user: userWithoutPassword,
//       token // Send token for client-side storage if needed
//     });

//     // Set HTTP-only cookie
//     response.cookies.set({
//       name: 'token',
//       value: token,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 60 * 60 * 24 * 7, // 7 days
//       path: '/',
//     });

//     // Set user info cookie (non-httpOnly for client access)
//     response.cookies.set({
//       name: 'user',
//       value: JSON.stringify(userWithoutPassword),
//       httpOnly: false,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 60 * 60 * 24 * 7, // 7 days
//       path: '/',
//     });

//     console.log(`✅ Login successful for user: ${user.email} (role: ${user.role})`);

//     return response;

//   } catch (error) {
//     console.error("❌ Login error:", error);
    
//     return NextResponse.json(
//       {
//         success: false,
//         message: "An error occurred during login. Please try again.",
//       },
//       { status: 500 }
//     );
//   }
// }

// // ==================== GET ENDPOINT (Check current user) ====================

// export async function GET(req: NextRequest) {
//   try {
//     const token = req.cookies.get('token')?.value;

//     if (!token) {
//       return NextResponse.json(
//         { success: false, message: "Not authenticated" },
//         { status: 401 }
//       );
//     }

//     const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    
//     try {
//       const decoded = jwt.verify(token, JWT_SECRET) as any;
      
//       // Get fresh user data
//       const userResult = await query(
//         'SELECT id, email, full_name_en, role, patient_id, created_at FROM users WHERE id = $1',
//         [decoded.id]
//       );

//       if (userResult.rows.length === 0) {
//         return NextResponse.json(
//           { success: false, message: "User not found" },
//           { status: 404 }
//         );
//       }

//       return NextResponse.json({
//         success: true,
//         user: userResult.rows[0]
//       });

//     } catch (err) {
//       return NextResponse.json(
//         { success: false, message: "Invalid token" },
//         { status: 401 }
//       );
//     }

//   } catch (error) {
//     console.error("❌ Error fetching user:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "An error occurred",
//       },
//       { status: 500 }
//     );
//   }
// }



import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';
import jwt from 'jsonwebtoken';

// ==================== HELPER FUNCTIONS ====================

function validateInput(data: any): { isValid: boolean; errors: { email?: string; password?: string } } {
  const errors: { email?: string; password?: string } = {};

  if (!data.email?.trim()) {
    errors.email = "Email or Patient ID is required";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// ==================== POST ENDPOINT ====================

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // 1. Validate input
    const validation = validateInput({ email, password });
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: validation.errors },
        { status: 400 }
      );
    }

    // 2. Authenticate with Supabase
    const { data: authData, error: authError } = await supabaseAdmin.auth.signInWithPassword({
      email: email.toLowerCase(),
      password,
    });

    if (authError || !authData.user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 3. Fetch your custom user record using the Supabase user ID
    const { data: userData, error: dbError } = await supabaseAdmin
      .from('users')
      .select('id, email, full_name_en, role, patient_id, created_at')
      .eq('auth_user_id', authData.user.id)
      .single();

    if (dbError || !userData) {
      console.error('Custom user not found for auth user', authData.user.id);
      return NextResponse.json(
        { success: false, message: "User profile not found" },
        { status: 404 }
      );
    }

    // 4. Generate your own JWT (same as before)
    const token = jwt.sign(
      {
        id: userData.id,
        email: userData.email,
        role: userData.role,
        patientId: userData.patient_id,
      },
      process.env.JWT_SECRET!, // make sure JWT_SECRET is set in env
      { expiresIn: '7d' }
    );

    // 5. Remove password from response (your custom table shouldn't have it)
    //    We'll just send userData as is.

    // 6. Return the same structure as before
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: userData.id,
        email: userData.email,
        full_name_en: userData.full_name_en,
        role: userData.role,
        patient_id: userData.patient_id,
        created_at: userData.created_at,
      },
      token,
    });

    // Optional: set cookies (if you rely on them)
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    response.cookies.set({
      name: 'user',
      value: JSON.stringify(userData),
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}