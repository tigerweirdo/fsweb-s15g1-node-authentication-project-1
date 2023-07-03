const db= require("../../data/db-config");

/**
  tüm kullanıcıları içeren bir DİZİ ye çözümlenir, tüm kullanıcılar { user_id, username } içerir
 */
function bul() {
  return db("users");
}

/**
  verilen filtreye sahip tüm kullanıcıları içeren bir DİZİ ye çözümlenir
  goreBul({username:"veysel"});
  goreBul({user_id:1});
 */
function goreBul(filtre) {
  return db("users").where(filtre); //dizi
}

/**
  verilen user_id li kullanıcıya çözümlenir, kullanıcı { user_id, username } içerir
 */
async function idyeGoreBul(user_id) {
  let arrayOrn = await db("users").where("user_id",user_id); //[{user_id:1,username:"veysel"}]
  let objOrn = await db("users").where("user_id",user_id).first();
  return objOrn;
}

/**
  yeni eklenen kullanıcıya çözümlenir { user_id, username }
 */
async function ekle(user) {
  let [user_id] = await db("users").insert(user);
  return idyeGoreBul(user_id);
}

// Diğer modüllerde kullanılabilmesi için fonksiyonları "exports" nesnesine eklemeyi unutmayın.

module.exports = {
  bul,goreBul,idyeGoreBul,ekle
}