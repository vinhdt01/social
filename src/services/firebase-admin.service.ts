import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAdminService implements OnModuleInit {
  private static app: admin.app.App;

  onModuleInit() {
    if (!FirebaseAdminService.app) {
      console.log('Initializing Firebase app');
      FirebaseAdminService.app = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: "auth-social-99539",
          privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCuS+7a8nkNqGLX\nqXL5mvgLll5uaXoOThDzgUxUHKY6hM62q+lbXVX348QQj8NCPK3c62b/3qHmOW3Z\n6J6HIuEidl74aKVlgMdCnYPer9UxIt3OFdIft3rUqev76L4TckpfWIcOm3UrysCt\nxitHNJsK2aWTWgPrfb34UjAJZ17fkLWX0a6twf2Mi4qK3FzouhiKTl2kl6FETqSW\nC/yjSkiIN8BBOVGwwLW7Yatm9rGdIFCeHt/xsgozx0CA/ZRYh83xP3gtdiYhvjuR\nGUJwoKReD5gdQ7frcA1JboiHTSl6ROQyxe7vy02z8VqK+6uRdLUoZffH2V+pLG3i\nKLCPR4AZAgMBAAECggEAEiaXL6wriLgTNFk8P3Ebc/1177KX7YXEryRft1dVGj1Q\nAjxB12wPXVAV+rw16HUa4qmNttyk6ILs2nymhvUjaSwsNLCVH3kQhx08foQPbrKu\nUt1OiKivUmva8YdUcABUGBIch8a5pin9nxBxhlScnBMmnS3fwEt+bS3bPHIhh6TF\nY39kcoD4RJwH6D+yXtNaU2dJeCFg+9cM7IZXOXbObZB7cb5C0zHLgg45vK8ig5PO\ncAz0GMYijzIuyg1Nm/Ofk9nXHV3tXuqZDA34im+GavoZ7na34QfRRWj2G8ztb0/P\nsDSfcnpPPqufSEsWAuOHupHAkDcKdsTf6TV6jXVGHwKBgQDZeZ4GibMZ5zbSsh3r\niSTJ7y/cFI9GpxHHD4+dTIMXD0Ihg1soh6m0LXqs4K4FNV+3JLKOis1Fijx+kyUh\nUU1/ERk5mWdaOoLHaRyZlmQstIX/l/9dSmYNPC0T+fRiorEpSD6JJI11V6PAv+ZT\nk+H89hUkIHDH2MI6FDMiqlJxAwKBgQDNLDHrwBpp1DHe4/FqIhIiiNQqeT0LioAM\naPyaj+xtEX9eh0oJhb3TFCRhiSiASq65s2lZYg8CxDvePyONC17Cs48q6+rVjJi5\nUa3A6ZZ9qFSHWdy7ahq8tNeLfgKTdPKWPKVBlJYF4tNTcKhj+dbdWlCPKWohZuYY\n/oONJYMpswKBgQClbTmjx4MRpSuywgK4dC4j3WoOgyUpnVSMk22vPdBJ7jVjwMPK\n5MdWY3H5pz84fw08BxI8E6Fp0GmL7upDmdDVY3BIvEQ+AlwQzAgRXLD+wKNddYWu\ntTVDxA6WL4CStycEPAw1zjQ8mlnZ+R9/W/J/tcEHJhYkLuIvw8XSDLWBeQKBgQDF\nDHMNdjxn83HKHaWYRwyfukX6XOIyGVyNjq88SonI3oszYD/NEXOUK74dJruNKyzQ\nEO1W+QRtpcXR11XvekISQJ15nYa2fgeXxEhaBH2SRX6ZV8bVADyZjB2PTQBwWls5\nyxjz+R50nLpVYtd23VZs1PaV6DKTzd2jl50EjEiCXQKBgBsL8arz8j3/iuDHp0Yx\n9af5fXFxL8hTddbvwb3ALdBu9peIPwp7VhMYikBwQYCyS8bmfMeAsbUrUi8/sqHF\naO/RMoyOZGj+5Lt5zlhPDsZQj65O05LfAQnkQU2cwl+qOq3Vxh20RaUxsxAPneAP\nH6iVTo5L+YQKGZOM4MFNpui1\n-----END PRIVATE KEY-----\n",
          clientEmail: "firebase-adminsdk-t23sd@auth-social-99539.iam.gserviceaccount.com",
 
        }
         ),
      });
      console.log('Firebase initialized successfully');
    }
  }

  async verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
 
    try {
      if (!FirebaseAdminService.app) {
        console.error('Firebase app is not initialized');
        throw new Error('Firebase app is not initialized');
      }

      console.log('Verifying ID token:', idToken);
      const decodedToken = await FirebaseAdminService.app.auth().verifyIdToken(idToken);
      console.log('Decoded token:', decodedToken);
      return decodedToken;
    } catch (error) {
      console.error('Error during token verification:', error); // In toàn bộ lỗi
      throw error;
    }
  }
}
