var WI_CONFIG_ = {
  rootFolderId: '1JoaN3UkwcEGNGo0awHsOdQgkWfvLi6hJ',
  folderIds: {RADAR:'1Hy712mdHN7nc9vl0qlvp7767mZ94mzkj',RTS:'1doqkhGxYICXQJeRpLmtyc1mZl5olgMzt'},
  version: '1.0.0', maxPhotoBytes: 1000000, maxTotalPhotoBytes: 8000000,
  timezone: 'Asia/Jakarta', adminSessionSeconds: 3600
};
function config_() {
  var p=PropertiesService.getScriptProperties();
  return Object.assign({},WI_CONFIG_,{rootFolderId:p.getProperty('ROOT_FOLDER_ID')||WI_CONFIG_.rootFolderId,
    folderIds:{RADAR:p.getProperty('RADAR_FOLDER_ID')||WI_CONFIG_.folderIds.RADAR,RTS:p.getProperty('RTS_FOLDER_ID')||WI_CONFIG_.folderIds.RTS}});
}
/** Run only from the Apps Script editor. Private RPC function. */
function setup_() {
  var c=config_(),p=PropertiesService.getScriptProperties(),root=DriveApp.getFolderById(c.rootFolderId);
  ['RADAR','RTS'].forEach(function(type){var folder=DriveApp.getFolderById(c.folderIds[type]),parents=folder.getParents(),belongs=false;while(parents.hasNext())if(parents.next().getId()===root.getId())belongs=true;if(!belongs)throw new Error('Folder '+type+' harus berada di dalam folder tujuan.');});
  var secret=p.getProperty('ADMIN_PASSWORD');
  if(secret){if(secret.length<12)throw new Error('ADMIN_PASSWORD minimal 12 karakter.');p.setProperty('ADMIN_PASSWORD_HASH',passwordDigest_(secret));p.deleteProperty('ADMIN_PASSWORD');}
  var pin=p.getProperty('TECHNICIAN_PIN');if(pin){if(pin.length<6)throw new Error('TECHNICIAN_PIN minimal 6 karakter.');p.setProperty('TECHNICIAN_PIN_HASH',passwordDigest_(pin));p.deleteProperty('TECHNICIAN_PIN');}
  if(!p.getProperty('ADMIN_PASSWORD_HASH'))throw new Error('Isi ADMIN_PASSWORD pada Script Properties, lalu jalankan setup_ lagi.');
  return {ok:true,root:root.getName(),folders:c.folderIds};
}
