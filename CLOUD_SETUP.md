# تفعيل المزامنة السحابية

1. افتح https://console.firebase.google.com/ وأنشئ مشروع Firebase مجاني (Spark).
2. Project Overview → Add App → Web. انسخ firebaseConfig (apiKey, authDomain, projectId, appId) إلى ملف `firebase-config.js` على GitHub؛ استبدل قيم REPLACE. هذه إعدادات تطبيق عامة وليست كلمة مرور. لا تضع أي service account/private key في GitHub.
3. Build → Authentication → Get started → Sign-in method → فعّل Email/Password.
4. Build → Firestore Database → Create database → اختر Region مناسب. من تبويب Rules استبدل القواعد بمحتوى ملف `firestore.rules` واضغط Publish. لا تستخدم Test mode أو قواعد تسمح للجميع.
5. GitHub repository → Settings → General → Danger Zone → Change visibility إلى Public إذا كنت تستخدم GitHub Free وتريد GitHub Pages. **كل ملفات الكود ستصبح متاحة للجميع، لكن بياناتك المخزنة على Firestore يحميها تسجيل الدخول وقواعد الأمان.** إذا كنت لا تريد مستودعًا عامًا اختر استضافة أخرى بدل تغيير الرؤية.
6. GitHub → Settings → Pages → Source Deploy from a branch → main / (root) → Save. استعمل الرابط المنشور بعد اكتمال النشر.
7. في Firebase Authentication → Settings → Authorized domains أضف `mohamedreda299999-wq.github.io` لو لم يكن موجودًا.
8. افتح الموقع عبر https://mohamedreda299999-wq.github.io/my-finance-dashboard/ ثم الإعدادات → أدخل البريد وكلمة المرور → إنشاء حساب على الجهاز الأول، ثم تسجيل الدخول على الأجهزة الأخرى.
9. اعمل نسخة احتياطية JSON قبل أول مزامنة أو تحميل النسخة السحابية. تعارض تعديل نفس السجل على جهازين قد يسبب فقد تغييرات لأن التطبيق يزامن الملف كاملًا (آخر حفظ يفوز). لا تستخدم وضع أوفلاين على جهازين معًا حتى تكتمل مزامنة أحدهما.

لا تحتاج تثبيت أي برامج. ملفات مكتبات Firebase تحتاج اتصالًا بالإنترنت وقت تحميل الصفحة. حفظ البيانات المحلي يظل متاحًا، لكن المزامنة تحتاج اتصالًا.