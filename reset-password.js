// Vercel serverless function for password reset
// Bu dosya Vercel'de çalışacak

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // OPTIONS request için
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    // Sadece POST istekleri kabul et
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
    
    try {
        const { token, email, newPassword, confirmPassword } = req.body;
        
        // Validation
        if (!token || !email || !newPassword || !confirmPassword) {
            res.status(400).json({ 
                error: 'Eksik parametreler',
                message: 'Token, email, newPassword ve confirmPassword gerekli'
            });
            return;
        }
        
        if (newPassword !== confirmPassword) {
            res.status(400).json({ 
                error: 'Şifreler eşleşmiyor',
                message: 'Yeni şifre ve onay şifresi aynı olmalıdır'
            });
            return;
        }
        
        if (newPassword.length < 6) {
            res.status(400).json({ 
                error: 'Geçersiz şifre',
                message: 'Şifre en az 6 karakter olmalıdır'
            });
            return;
        }
        
        // Token validation (iOS uygulamasındaki TokenService ile aynı mantık)
        // Bu örnekte basit bir kontrol yapıyoruz
        // Gerçek uygulamada token'ı decrypt edip kontrol etmelisiniz
        
        console.log('Password reset request:', { 
            email, 
            token: token.substring(0, 10) + '...', 
            timestamp: new Date().toISOString() 
        });
        
        // Simulated success response
        // Gerçek uygulamada burada:
        // 1. Token'ı validate edin
        // 2. Şifreyi hash'leyin
        // 3. Veritabanını güncelleyin
        // 4. Token'ı invalidate edin
        
        res.status(200).json({
            success: true,
            message: 'Şifreniz başarıyla güncellendi'
        });
        
    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({
            error: 'Sunucu hatası',
            message: 'Şifre güncellenirken bir hata oluştu'
        });
    }
}
