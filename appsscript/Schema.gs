/** Single source of truth for server validation and client rendering. */
var WI_SCHEMAS_ = {
  "RADAR": {
    "type": "RADAR",
    "title": "Radar",
    "model": "Radar",
    "fields": [
      {
        "name": "Page_Identitas",
        "label": "Identitas inspeksi",
        "section": "Identitas inspeksi",
        "type": "Show",
        "options": [],
        "required": "FALSE",
        "show": "TRUE",
        "description": "Category: Page_Header; Content: \"Identitas inspeksi\"",
        "prefix": "",
        "help": ""
      },
      {
        "name": "Inspection_ID",
        "label": "ID inspeksi",
        "section": "Identitas inspeksi",
        "type": "Text",
        "options": [],
        "required": "TRUE",
        "show": "FALSE",
        "description": "Key; Editable_If FALSE; Reset on edit OFF.",
        "prefix": "",
        "help": ""
      },
      {
        "name": "Inspection_DateTime",
        "label": "Tanggal dan jam inspeksi",
        "section": "Identitas inspeksi",
        "type": "DateTime",
        "options": [],
        "required": "TRUE",
        "show": "TRUE",
        "description": "",
        "prefix": "",
        "help": ""
      },
      {
        "name": "Technician_Name",
        "label": "Nama field technician",
        "section": "Identitas inspeksi",
        "type": "Text",
        "options": [],
        "required": "TRUE",
        "show": "TRUE",
        "description": "",
        "prefix": "",
        "help": ""
      },
      {
        "name": "Radar_ID",
        "label": "Radar",
        "section": "Identitas inspeksi",
        "type": "Enum",
        "options": [
          "H-29",
          "A-83",
          "FM-24",
          "Lainnya"
        ],
        "required": "TRUE",
        "show": "TRUE",
        "description": "Base type Text; Allow other values OFF.",
        "prefix": "",
        "help": ""
      },
      {
        "name": "Radar_ID_Other",
        "label": "ID radar lainnya",
        "section": "Identitas inspeksi",
        "type": "Text",
        "options": [],
        "required": "[Radar_ID] = \"Lainnya\"",
        "show": "[Radar_ID] = \"Lainnya\"",
        "description": "",
        "prefix": "",
        "help": "",
        "when": {
          "field": "Radar_ID",
          "value": "Lainnya"
        }
      },
      {
        "name": "Radar_Location",
        "label": "Lokasi radar",
        "section": "Identitas inspeksi",
        "type": "Text",
        "options": [],
        "required": "TRUE",
        "show": "TRUE",
        "description": "Nama area/lokasi; tidak otomatis meminta GPS.",
        "prefix": "",
        "help": ""
      },
      {
        "name": "Page_General",
        "label": "General",
        "section": "General",
        "type": "Show",
        "options": [],
        "required": "FALSE",
        "show": "TRUE",
        "description": "Category: Page_Header; Content: \"General\"",
        "prefix": "",
        "help": ""
      },
      {
        "name": "General_Section_Status",
        "label": "Status pemeriksaan bagian",
        "section": "General",
        "type": "Enum",
        "options": [
          "Diperiksa",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "show": "TRUE",
        "description": "",
        "prefix": "General",
        "help": ""
      },
      {
        "name": "General_Scanner",
        "label": "Scanner / positioner / PTU / SU",
        "section": "General",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[General_Section_Status] = \"Diperiksa\"",
        "show": "[General_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "General",
        "help": ""
      },
      {
        "name": "General_Camera",
        "label": "Kamera",
        "section": "General",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[General_Section_Status] = \"Diperiksa\"",
        "show": "[General_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "General",
        "help": ""
      },
      {
        "name": "General_GPS",
        "label": "GPS",
        "section": "General",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[General_Section_Status] = \"Diperiksa\"",
        "show": "[General_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "General",
        "help": ""
      },
      {
        "name": "General_Battery_Terminals",
        "label": "Terminal baterai sistem",
        "section": "General",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[General_Section_Status] = \"Diperiksa\"",
        "show": "[General_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "General",
        "help": ""
      },
      {
        "name": "General_Cleanliness",
        "label": "Kebersihan radar",
        "section": "General",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[General_Section_Status] = \"Diperiksa\"",
        "show": "[General_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "General",
        "help": ""
      },
      {
        "name": "General_Scan_Obstruction",
        "label": "Area scanning bebas halangan",
        "section": "General",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[General_Section_Status] = \"Diperiksa\"",
        "show": "[General_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "General",
        "help": ""
      },
      {
        "name": "General_System_Battery_Voltage_V",
        "label": "Tegangan baterai sistem saat inspeksi (V)",
        "section": "General",
        "type": "Decimal",
        "options": [],
        "required": "FALSE",
        "show": "[General_Section_Status] = \"Diperiksa\"",
        "description": "Catat pembacaan saat inspeksi; jangan gunakan angka laporan April sebagai batas normal.",
        "prefix": "General",
        "help": "Isi pembacaan aktual; kosongkan jika tidak tersedia."
      },
      {
        "name": "General_Notes",
        "label": "Catatan General",
        "section": "General",
        "type": "LongText",
        "options": [],
        "required": "OR([General_Section_Status] = \"Tidak diperiksa\", AND([General_Section_Status] = \"Diperiksa\", OR(IN([General_Scanner], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([General_Camera], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([General_GPS], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([General_Battery_Terminals], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([General_Cleanliness], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([General_Scan_Obstruction], LIST(\"Ada masalah\", \"Tidak diperiksa\")))))",
        "show": "TRUE",
        "description": "Jelaskan temuan atau alasan bagian/item tidak diperiksa. Bagian N/A tidak wajib foto.",
        "prefix": "General",
        "help": "Wajib untuk masalah atau item yang tidak diperiksa."
      },
      {
        "name": "General_Image",
        "label": "Foto General",
        "section": "General",
        "type": "Image",
        "options": [],
        "required": "[General_Section_Status] = \"Diperiksa\"",
        "show": "[General_Section_Status] = \"Diperiksa\"",
        "description": "Satu foto utama bagian; tambahan foto temuan tersedia di akhir form.",
        "prefix": "General",
        "help": ""
      },
      {
        "name": "Page_Genset",
        "label": "Genset",
        "section": "Genset",
        "type": "Show",
        "options": [],
        "required": "FALSE",
        "show": "TRUE",
        "description": "Category: Page_Header; Content: \"Genset\"",
        "prefix": "",
        "help": ""
      },
      {
        "name": "Genset_Section_Status",
        "label": "Status pemeriksaan bagian",
        "section": "Genset",
        "type": "Enum",
        "options": [
          "Diperiksa",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "show": "TRUE",
        "description": "",
        "prefix": "Genset",
        "help": ""
      },
      {
        "name": "Genset_Fuel_Level",
        "label": "Ketersediaan bahan bakar",
        "section": "Genset",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Genset_Section_Status] = \"Diperiksa\"",
        "show": "[Genset_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Genset",
        "help": ""
      },
      {
        "name": "Genset_Oil_Level",
        "label": "Level oli",
        "section": "Genset",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Genset_Section_Status] = \"Diperiksa\"",
        "show": "[Genset_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Genset",
        "help": ""
      },
      {
        "name": "Genset_Fuel_Leak",
        "label": "Kondisi terkait kebocoran bahan bakar",
        "section": "Genset",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Genset_Section_Status] = \"Diperiksa\"",
        "show": "[Genset_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Genset",
        "help": ""
      },
      {
        "name": "Genset_Oil_Leak",
        "label": "Kondisi terkait kebocoran oli",
        "section": "Genset",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Genset_Section_Status] = \"Diperiksa\"",
        "show": "[Genset_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Genset",
        "help": ""
      },
      {
        "name": "Genset_Air_Filter",
        "label": "Kondisi filter udara",
        "section": "Genset",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Genset_Section_Status] = \"Diperiksa\"",
        "show": "[Genset_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Genset",
        "help": ""
      },
      {
        "name": "Genset_Oil_Filter",
        "label": "Kondisi filter oli",
        "section": "Genset",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Genset_Section_Status] = \"Diperiksa\"",
        "show": "[Genset_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Genset",
        "help": ""
      },
      {
        "name": "Genset_Fuel_Filter",
        "label": "Kondisi filter bahan bakar",
        "section": "Genset",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Genset_Section_Status] = \"Diperiksa\"",
        "show": "[Genset_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Genset",
        "help": ""
      },
      {
        "name": "Genset_Battery_Terminals",
        "label": "Terminal baterai starter",
        "section": "Genset",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Genset_Section_Status] = \"Diperiksa\"",
        "show": "[Genset_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Genset",
        "help": ""
      },
      {
        "name": "Genset_Charging",
        "label": "Charging baterai starter",
        "section": "Genset",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Genset_Section_Status] = \"Diperiksa\"",
        "show": "[Genset_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Genset",
        "help": ""
      },
      {
        "name": "Genset_Alarm",
        "label": "Kondisi alarm genset",
        "section": "Genset",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Genset_Section_Status] = \"Diperiksa\"",
        "show": "[Genset_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Genset",
        "help": ""
      },
      {
        "name": "Genset_Serial_Number",
        "label": "Nomor seri genset",
        "section": "Genset",
        "type": "Text",
        "options": [],
        "required": "FALSE",
        "show": "[Genset_Section_Status] = \"Diperiksa\"",
        "description": "Nomor yang dibaca pada unit.",
        "prefix": "Genset",
        "help": ""
      },
      {
        "name": "Genset_Run_Hours",
        "label": "Running hours genset (jam)",
        "section": "Genset",
        "type": "Decimal",
        "options": [],
        "required": "FALSE",
        "show": "[Genset_Section_Status] = \"Diperiksa\"",
        "description": "Angka total hour meter; tidak melakukan reset.",
        "prefix": "Genset",
        "help": "Isi pembacaan aktual; kosongkan jika tidak tersedia."
      },
      {
        "name": "Genset_Starter_Battery_Voltage_V",
        "label": "Tegangan baterai starter (V)",
        "section": "Genset",
        "type": "Decimal",
        "options": [],
        "required": "FALSE",
        "show": "[Genset_Section_Status] = \"Diperiksa\"",
        "description": "Pembacaan baterai starter nominal 12 V; tidak menetapkan ambang.",
        "prefix": "Genset",
        "help": "Isi pembacaan aktual; kosongkan jika tidak tersedia."
      },
      {
        "name": "Genset_Notes",
        "label": "Catatan Genset",
        "section": "Genset",
        "type": "LongText",
        "options": [],
        "required": "OR([Genset_Section_Status] = \"Tidak diperiksa\", AND([Genset_Section_Status] = \"Diperiksa\", OR(IN([Genset_Fuel_Level], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Genset_Oil_Level], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Genset_Fuel_Leak], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Genset_Oil_Leak], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Genset_Air_Filter], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Genset_Oil_Filter], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Genset_Fuel_Filter], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Genset_Battery_Terminals], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Genset_Charging], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Genset_Alarm], LIST(\"Ada masalah\", \"Tidak diperiksa\")))))",
        "show": "TRUE",
        "description": "Jelaskan temuan atau alasan bagian/item tidak diperiksa. Bagian N/A tidak wajib foto.",
        "prefix": "Genset",
        "help": "Wajib untuk masalah atau item yang tidak diperiksa."
      },
      {
        "name": "Genset_Image",
        "label": "Foto Genset",
        "section": "Genset",
        "type": "Image",
        "options": [],
        "required": "[Genset_Section_Status] = \"Diperiksa\"",
        "show": "[Genset_Section_Status] = \"Diperiksa\"",
        "description": "Satu foto utama bagian; tambahan foto temuan tersedia di akhir form.",
        "prefix": "Genset",
        "help": ""
      },
      {
        "name": "Page_Controller",
        "label": "Modul controller & komunikasi",
        "section": "Modul controller & komunikasi",
        "type": "Show",
        "options": [],
        "required": "FALSE",
        "show": "TRUE",
        "description": "Category: Page_Header; Content: \"Modul controller & komunikasi\"",
        "prefix": "",
        "help": ""
      },
      {
        "name": "Controller_Section_Status",
        "label": "Status pemeriksaan bagian",
        "section": "Modul controller & komunikasi",
        "type": "Enum",
        "options": [
          "Diperiksa",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "show": "TRUE",
        "description": "",
        "prefix": "Controller",
        "help": ""
      },
      {
        "name": "Controller_Module",
        "label": "Kondisi modul controller",
        "section": "Modul controller & komunikasi",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Controller_Section_Status] = \"Diperiksa\"",
        "show": "[Controller_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Controller",
        "help": ""
      },
      {
        "name": "Controller_Cables_Connectors",
        "label": "Kabel dan konektor controller",
        "section": "Modul controller & komunikasi",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Controller_Section_Status] = \"Diperiksa\"",
        "show": "[Controller_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Controller",
        "help": ""
      },
      {
        "name": "Controller_Alarm",
        "label": "Kondisi alarm controller",
        "section": "Modul controller & komunikasi",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Controller_Section_Status] = \"Diperiksa\"",
        "show": "[Controller_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Controller",
        "help": ""
      },
      {
        "name": "Controller_Camera_Transfer",
        "label": "Transfer gambar kamera",
        "section": "Modul controller & komunikasi",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Controller_Section_Status] = \"Diperiksa\"",
        "show": "[Controller_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Controller",
        "help": ""
      },
      {
        "name": "Controller_WNC_RDP",
        "label": "Koneksi WNC / RDP",
        "section": "Modul controller & komunikasi",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Controller_Section_Status] = \"Diperiksa\"",
        "show": "[Controller_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Controller",
        "help": ""
      },
      {
        "name": "Controller_PSV_Transmission",
        "label": "Transmisi PSV",
        "section": "Modul controller & komunikasi",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Controller_Section_Status] = \"Diperiksa\"",
        "show": "[Controller_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Controller",
        "help": ""
      },
      {
        "name": "Controller_Guardian_Sync",
        "label": "Sinkronisasi controller dengan Guardian",
        "section": "Modul controller & komunikasi",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Controller_Section_Status] = \"Diperiksa\"",
        "show": "[Controller_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Controller",
        "help": ""
      },
      {
        "name": "Controller_SW_Version",
        "label": "Versi software controller",
        "section": "Modul controller & komunikasi",
        "type": "Text",
        "options": [],
        "required": "FALSE",
        "show": "[Controller_Section_Status] = \"Diperiksa\"",
        "description": "Catat versi yang tampil; tidak melakukan upgrade/restart.",
        "prefix": "Controller",
        "help": ""
      },
      {
        "name": "Controller_HDD_Free_Value",
        "label": "Sisa kapasitas HDD",
        "section": "Modul controller & komunikasi",
        "type": "Decimal",
        "options": [],
        "required": "FALSE",
        "show": "[Controller_Section_Status] = \"Diperiksa\"",
        "description": "Isi nilai dan satuan sesuai display.",
        "prefix": "Controller",
        "help": "Isi pembacaan aktual; kosongkan jika tidak tersedia."
      },
      {
        "name": "Controller_HDD_Free_Unit",
        "label": "Satuan kapasitas HDD",
        "section": "Modul controller & komunikasi",
        "type": "Enum",
        "options": [
          "GB",
          "TB",
          "MB"
        ],
        "required": "AND([Controller_Section_Status] = \"Diperiksa\", ISNOTBLANK([Controller_HDD_Free_Value]))",
        "show": "[Controller_Section_Status] = \"Diperiksa\"",
        "description": "Isi sesuai display; jangan mengisi angka perkiraan atau nilai default.",
        "prefix": "Controller",
        "help": ""
      },
      {
        "name": "Controller_Notes",
        "label": "Catatan Modul controller & komunikasi",
        "section": "Modul controller & komunikasi",
        "type": "LongText",
        "options": [],
        "required": "OR([Controller_Section_Status] = \"Tidak diperiksa\", AND([Controller_Section_Status] = \"Diperiksa\", OR(IN([Controller_Module], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Controller_Cables_Connectors], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Controller_Alarm], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Controller_Camera_Transfer], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Controller_WNC_RDP], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Controller_PSV_Transmission], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Controller_Guardian_Sync], LIST(\"Ada masalah\", \"Tidak diperiksa\")))))",
        "show": "TRUE",
        "description": "Jelaskan temuan atau alasan bagian/item tidak diperiksa. Bagian N/A tidak wajib foto.",
        "prefix": "Controller",
        "help": "Wajib untuk masalah atau item yang tidak diperiksa."
      },
      {
        "name": "Controller_Image",
        "label": "Foto Modul controller & komunikasi",
        "section": "Modul controller & komunikasi",
        "type": "Image",
        "options": [],
        "required": "[Controller_Section_Status] = \"Diperiksa\"",
        "show": "[Controller_Section_Status] = \"Diperiksa\"",
        "description": "Satu foto utama bagian; tambahan foto temuan tersedia di akhir form.",
        "prefix": "Controller",
        "help": ""
      },
      {
        "name": "Page_Solar",
        "label": "Solar panel",
        "section": "Solar panel",
        "type": "Show",
        "options": [],
        "required": "FALSE",
        "show": "TRUE",
        "description": "Category: Page_Header; Content: \"Solar panel\"",
        "prefix": "",
        "help": ""
      },
      {
        "name": "Solar_Section_Status",
        "label": "Status pemeriksaan bagian",
        "section": "Solar panel",
        "type": "Enum",
        "options": [
          "Diperiksa",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "show": "TRUE",
        "description": "",
        "prefix": "Solar",
        "help": ""
      },
      {
        "name": "Solar_Cleanliness",
        "label": "Kebersihan panel",
        "section": "Solar panel",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Solar_Section_Status] = \"Diperiksa\"",
        "show": "[Solar_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Solar",
        "help": ""
      },
      {
        "name": "Solar_Panel_Condition",
        "label": "Kondisi fisik panel",
        "section": "Solar panel",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Solar_Section_Status] = \"Diperiksa\"",
        "show": "[Solar_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Solar",
        "help": ""
      },
      {
        "name": "Solar_Cables_Connectors",
        "label": "Kabel dan konektor solar",
        "section": "Solar panel",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Solar_Section_Status] = \"Diperiksa\"",
        "show": "[Solar_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Solar",
        "help": ""
      },
      {
        "name": "Solar_Mounting",
        "label": "Mounting panel",
        "section": "Solar panel",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Solar_Section_Status] = \"Diperiksa\"",
        "show": "[Solar_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Solar",
        "help": ""
      },
      {
        "name": "Solar_Surge_Protector",
        "label": "Surge protector",
        "section": "Solar panel",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Solar_Section_Status] = \"Diperiksa\"",
        "show": "[Solar_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Solar",
        "help": ""
      },
      {
        "name": "Solar_Charging",
        "label": "Status supply / charging solar",
        "section": "Solar panel",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Solar_Section_Status] = \"Diperiksa\"",
        "show": "[Solar_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Solar",
        "help": ""
      },
      {
        "name": "Solar_Output_Value",
        "label": "Output solar pada display",
        "section": "Solar panel",
        "type": "Decimal",
        "options": [],
        "required": "FALSE",
        "show": "[Solar_Section_Status] = \"Diperiksa\"",
        "description": "Pembacaan saat inspeksi; bukan rata-rata 30 hari.",
        "prefix": "Solar",
        "help": "Isi pembacaan aktual; kosongkan jika tidak tersedia."
      },
      {
        "name": "Solar_Output_Unit",
        "label": "Satuan output solar",
        "section": "Solar panel",
        "type": "Enum",
        "options": [
          "W",
          "V",
          "A"
        ],
        "required": "AND([Solar_Section_Status] = \"Diperiksa\", ISNOTBLANK([Solar_Output_Value]))",
        "show": "[Solar_Section_Status] = \"Diperiksa\"",
        "description": "Isi sesuai display; jangan mengisi angka perkiraan atau nilai default.",
        "prefix": "Solar",
        "help": ""
      },
      {
        "name": "Solar_Notes",
        "label": "Catatan Solar panel",
        "section": "Solar panel",
        "type": "LongText",
        "options": [],
        "required": "OR([Solar_Section_Status] = \"Tidak diperiksa\", AND([Solar_Section_Status] = \"Diperiksa\", OR(IN([Solar_Cleanliness], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Solar_Panel_Condition], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Solar_Cables_Connectors], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Solar_Mounting], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Solar_Surge_Protector], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Solar_Charging], LIST(\"Ada masalah\", \"Tidak diperiksa\")))))",
        "show": "TRUE",
        "description": "Jelaskan temuan atau alasan bagian/item tidak diperiksa. Bagian N/A tidak wajib foto.",
        "prefix": "Solar",
        "help": "Wajib untuk masalah atau item yang tidak diperiksa."
      },
      {
        "name": "Solar_Image",
        "label": "Foto Solar panel",
        "section": "Solar panel",
        "type": "Image",
        "options": [],
        "required": "[Solar_Section_Status] = \"Diperiksa\"",
        "show": "[Solar_Section_Status] = \"Diperiksa\"",
        "description": "Satu foto utama bagian; tambahan foto temuan tersedia di akhir form.",
        "prefix": "Solar",
        "help": ""
      },
      {
        "name": "Page_Weather",
        "label": "Weather station",
        "section": "Weather station",
        "type": "Show",
        "options": [],
        "required": "FALSE",
        "show": "TRUE",
        "description": "Category: Page_Header; Content: \"Weather station\"",
        "prefix": "",
        "help": ""
      },
      {
        "name": "Weather_Section_Status",
        "label": "Status pemeriksaan bagian",
        "section": "Weather station",
        "type": "Enum",
        "options": [
          "Diperiksa",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "show": "TRUE",
        "description": "",
        "prefix": "Weather",
        "help": ""
      },
      {
        "name": "Weather_Sensor_Cleanliness",
        "label": "Kebersihan sensor cuaca",
        "section": "Weather station",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Weather_Section_Status] = \"Diperiksa\"",
        "show": "[Weather_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Weather",
        "help": ""
      },
      {
        "name": "Weather_Mast_Cables_Connectors",
        "label": "Mast, kabel dan konektor",
        "section": "Weather station",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Weather_Section_Status] = \"Diperiksa\"",
        "show": "[Weather_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Weather",
        "help": ""
      },
      {
        "name": "Weather_Readings_Available",
        "label": "Ketersediaan pembacaan cuaca",
        "section": "Weather station",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Weather_Section_Status] = \"Diperiksa\"",
        "show": "[Weather_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Weather",
        "help": ""
      },
      {
        "name": "Weather_Rainfall_Value",
        "label": "Rainfall",
        "section": "Weather station",
        "type": "Decimal",
        "options": [],
        "required": "FALSE",
        "show": "[Weather_Section_Status] = \"Diperiksa\"",
        "description": "Catat periode dan satuan sesuai display; nol hanya bila terbaca nol.",
        "prefix": "Weather",
        "help": "Isi pembacaan aktual; kosongkan jika tidak tersedia."
      },
      {
        "name": "Weather_Rainfall_Unit",
        "label": "Satuan rainfall",
        "section": "Weather station",
        "type": "Text",
        "options": [],
        "required": "AND([Weather_Section_Status] = \"Diperiksa\", ISNOTBLANK([Weather_Rainfall_Value]))",
        "show": "[Weather_Section_Status] = \"Diperiksa\"",
        "description": "Isi sesuai display; jangan mengisi angka perkiraan atau nilai default.",
        "prefix": "Weather",
        "help": ""
      },
      {
        "name": "Weather_Rainfall_Period",
        "label": "Periode rainfall pada display",
        "section": "Weather station",
        "type": "Text",
        "options": [],
        "required": "FALSE",
        "show": "[Weather_Section_Status] = \"Diperiksa\"",
        "description": "Misalnya akumulasi hari ini atau periode yang tampil; jangan diasumsikan.",
        "prefix": "Weather",
        "help": ""
      },
      {
        "name": "Weather_Temperature_Value",
        "label": "Temperature",
        "section": "Weather station",
        "type": "Decimal",
        "options": [],
        "required": "FALSE",
        "show": "[Weather_Section_Status] = \"Diperiksa\"",
        "description": "Isi sesuai display; jangan mengisi angka perkiraan atau nilai default.",
        "prefix": "Weather",
        "help": "Isi pembacaan aktual; kosongkan jika tidak tersedia."
      },
      {
        "name": "Weather_Temperature_Unit",
        "label": "Satuan temperature",
        "section": "Weather station",
        "type": "Enum",
        "options": [
          "°C",
          "°F"
        ],
        "required": "AND([Weather_Section_Status] = \"Diperiksa\", ISNOTBLANK([Weather_Temperature_Value]))",
        "show": "[Weather_Section_Status] = \"Diperiksa\"",
        "description": "Isi sesuai display; jangan mengisi angka perkiraan atau nilai default.",
        "prefix": "Weather",
        "help": ""
      },
      {
        "name": "Weather_Pressure_Value",
        "label": "Barometric pressure",
        "section": "Weather station",
        "type": "Decimal",
        "options": [],
        "required": "FALSE",
        "show": "[Weather_Section_Status] = \"Diperiksa\"",
        "description": "Isi sesuai display; jangan mengisi angka perkiraan atau nilai default.",
        "prefix": "Weather",
        "help": "Isi pembacaan aktual; kosongkan jika tidak tersedia."
      },
      {
        "name": "Weather_Pressure_Unit",
        "label": "Satuan pressure",
        "section": "Weather station",
        "type": "Enum",
        "options": [
          "hPa",
          "mbar",
          "kPa",
          "Pa"
        ],
        "required": "AND([Weather_Section_Status] = \"Diperiksa\", ISNOTBLANK([Weather_Pressure_Value]))",
        "show": "[Weather_Section_Status] = \"Diperiksa\"",
        "description": "Isi sesuai display; jangan mengisi angka perkiraan atau nilai default.",
        "prefix": "Weather",
        "help": ""
      },
      {
        "name": "Weather_Humidity_Percent",
        "label": "Humidity (%)",
        "section": "Weather station",
        "type": "Decimal",
        "options": [],
        "required": "FALSE",
        "show": "[Weather_Section_Status] = \"Diperiksa\"",
        "description": "Isi sesuai display; jangan mengisi angka perkiraan atau nilai default.",
        "prefix": "Weather",
        "help": "Isi pembacaan aktual; kosongkan jika tidak tersedia."
      },
      {
        "name": "Weather_Wind_Speed_Value",
        "label": "Wind speed",
        "section": "Weather station",
        "type": "Decimal",
        "options": [],
        "required": "FALSE",
        "show": "[Weather_Section_Status] = \"Diperiksa\"",
        "description": "Isi sesuai display; jangan mengisi angka perkiraan atau nilai default.",
        "prefix": "Weather",
        "help": "Isi pembacaan aktual; kosongkan jika tidak tersedia."
      },
      {
        "name": "Weather_Wind_Speed_Unit",
        "label": "Satuan wind speed",
        "section": "Weather station",
        "type": "Enum",
        "options": [
          "m/s",
          "km/h",
          "knots"
        ],
        "required": "AND([Weather_Section_Status] = \"Diperiksa\", ISNOTBLANK([Weather_Wind_Speed_Value]))",
        "show": "[Weather_Section_Status] = \"Diperiksa\"",
        "description": "Isi sesuai display; jangan mengisi angka perkiraan atau nilai default.",
        "prefix": "Weather",
        "help": ""
      },
      {
        "name": "Weather_Wind_Direction",
        "label": "Wind direction sesuai display",
        "section": "Weather station",
        "type": "Text",
        "options": [],
        "required": "FALSE",
        "show": "[Weather_Section_Status] = \"Diperiksa\"",
        "description": "Catat arah atau derajat beserta satuannya.",
        "prefix": "Weather",
        "help": ""
      },
      {
        "name": "Weather_Notes",
        "label": "Catatan Weather station",
        "section": "Weather station",
        "type": "LongText",
        "options": [],
        "required": "OR([Weather_Section_Status] = \"Tidak diperiksa\", AND([Weather_Section_Status] = \"Diperiksa\", OR(IN([Weather_Sensor_Cleanliness], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Weather_Mast_Cables_Connectors], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Weather_Readings_Available], LIST(\"Ada masalah\", \"Tidak diperiksa\")))))",
        "show": "TRUE",
        "description": "Jelaskan temuan atau alasan bagian/item tidak diperiksa. Bagian N/A tidak wajib foto.",
        "prefix": "Weather",
        "help": "Wajib untuk masalah atau item yang tidak diperiksa."
      },
      {
        "name": "Weather_Image",
        "label": "Foto Weather station",
        "section": "Weather station",
        "type": "Image",
        "options": [],
        "required": "[Weather_Section_Status] = \"Diperiksa\"",
        "show": "[Weather_Section_Status] = \"Diperiksa\"",
        "description": "Satu foto utama bagian; tambahan foto temuan tersedia di akhir form.",
        "prefix": "Weather",
        "help": ""
      },
      {
        "name": "Page_Trailer",
        "label": "Trailer / container & keselamatan",
        "section": "Trailer / container & keselamatan",
        "type": "Show",
        "options": [],
        "required": "FALSE",
        "show": "TRUE",
        "description": "Category: Page_Header; Content: \"Trailer / container & keselamatan\"",
        "prefix": "",
        "help": ""
      },
      {
        "name": "Trailer_Section_Status",
        "label": "Status pemeriksaan bagian",
        "section": "Trailer / container & keselamatan",
        "type": "Enum",
        "options": [
          "Diperiksa",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "show": "TRUE",
        "description": "",
        "prefix": "Trailer",
        "help": ""
      },
      {
        "name": "Trailer_Wheels_Tyres",
        "label": "Wheels dan tyres",
        "section": "Trailer / container & keselamatan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Trailer_Section_Status] = \"Diperiksa\"",
        "show": "[Trailer_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Trailer",
        "help": ""
      },
      {
        "name": "Trailer_Exterior_Mounting",
        "label": "Exterior dan mounting",
        "section": "Trailer / container & keselamatan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Trailer_Section_Status] = \"Diperiksa\"",
        "show": "[Trailer_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Trailer",
        "help": ""
      },
      {
        "name": "Trailer_Tow_Hitch",
        "label": "Tow hitch",
        "section": "Trailer / container & keselamatan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Trailer_Section_Status] = \"Diperiksa\"",
        "show": "[Trailer_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Trailer",
        "help": ""
      },
      {
        "name": "Trailer_Levelling_Hydraulics",
        "label": "Levelling / hydraulics",
        "section": "Trailer / container & keselamatan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Trailer_Section_Status] = \"Diperiksa\"",
        "show": "[Trailer_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Trailer",
        "help": ""
      },
      {
        "name": "Trailer_Brakes",
        "label": "Brakes (pemeriksaan visual)",
        "section": "Trailer / container & keselamatan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Trailer_Section_Status] = \"Diperiksa\"",
        "show": "[Trailer_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Trailer",
        "help": ""
      },
      {
        "name": "Trailer_Breakaway_Battery",
        "label": "Kondisi emergency breakaway battery",
        "section": "Trailer / container & keselamatan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Trailer_Section_Status] = \"Diperiksa\"",
        "show": "[Trailer_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Trailer",
        "help": ""
      },
      {
        "name": "Trailer_Doors_Gas_Struts",
        "label": "Doors / gas struts",
        "section": "Trailer / container & keselamatan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Trailer_Section_Status] = \"Diperiksa\"",
        "show": "[Trailer_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Trailer",
        "help": ""
      },
      {
        "name": "Trailer_Fire_Extinguisher",
        "label": "APAR dan indikator tekanan",
        "section": "Trailer / container & keselamatan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Trailer_Section_Status] = \"Diperiksa\"",
        "show": "[Trailer_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Trailer",
        "help": ""
      },
      {
        "name": "Trailer_E_Stop_Visual",
        "label": "Kondisi E-stop (visual)",
        "section": "Trailer / container & keselamatan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Trailer_Section_Status] = \"Diperiksa\"",
        "show": "[Trailer_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Trailer",
        "help": ""
      },
      {
        "name": "Trailer_Container_Leaks",
        "label": "Kondisi terkait kebocoran container",
        "section": "Trailer / container & keselamatan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Trailer_Section_Status] = \"Diperiksa\"",
        "show": "[Trailer_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Trailer",
        "help": ""
      },
      {
        "name": "Trailer_Container_Screen",
        "label": "Screen pelindung container",
        "section": "Trailer / container & keselamatan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Trailer_Section_Status] = \"Diperiksa\"",
        "show": "[Trailer_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Trailer",
        "help": ""
      },
      {
        "name": "Trailer_Container_Cabling",
        "label": "Kabel container",
        "section": "Trailer / container & keselamatan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Trailer_Section_Status] = \"Diperiksa\"",
        "show": "[Trailer_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Trailer",
        "help": ""
      },
      {
        "name": "Trailer_Safety_Rails",
        "label": "Safety rails",
        "section": "Trailer / container & keselamatan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "[Trailer_Section_Status] = \"Diperiksa\"",
        "show": "[Trailer_Section_Status] = \"Diperiksa\"",
        "description": "Tanpa pilihan default. Untuk kebocoran/halangan/alarm: Baik berarti tidak ada kondisi bermasalah.",
        "prefix": "Trailer",
        "help": ""
      },
      {
        "name": "Trailer_Notes",
        "label": "Catatan Trailer / container & keselamatan",
        "section": "Trailer / container & keselamatan",
        "type": "LongText",
        "options": [],
        "required": "OR([Trailer_Section_Status] = \"Tidak diperiksa\", AND([Trailer_Section_Status] = \"Diperiksa\", OR(IN([Trailer_Wheels_Tyres], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Trailer_Exterior_Mounting], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Trailer_Tow_Hitch], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Trailer_Levelling_Hydraulics], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Trailer_Brakes], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Trailer_Breakaway_Battery], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Trailer_Doors_Gas_Struts], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Trailer_Fire_Extinguisher], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Trailer_E_Stop_Visual], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Trailer_Container_Leaks], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Trailer_Container_Screen], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Trailer_Container_Cabling], LIST(\"Ada masalah\", \"Tidak diperiksa\")), IN([Trailer_Safety_Rails], LIST(\"Ada masalah\", \"Tidak diperiksa\")))))",
        "show": "TRUE",
        "description": "Jelaskan temuan atau alasan bagian/item tidak diperiksa. Bagian N/A tidak wajib foto.",
        "prefix": "Trailer",
        "help": "Wajib untuk masalah atau item yang tidak diperiksa."
      },
      {
        "name": "Trailer_Image",
        "label": "Foto Trailer / container & keselamatan",
        "section": "Trailer / container & keselamatan",
        "type": "Image",
        "options": [],
        "required": "[Trailer_Section_Status] = \"Diperiksa\"",
        "show": "[Trailer_Section_Status] = \"Diperiksa\"",
        "description": "Satu foto utama bagian; tambahan foto temuan tersedia di akhir form.",
        "prefix": "Trailer",
        "help": ""
      },
      {
        "name": "Page_Findings",
        "label": "Temuan & tindak lanjut",
        "section": "Temuan & tindak lanjut",
        "type": "Show",
        "options": [],
        "required": "FALSE",
        "show": "TRUE",
        "description": "Category: Page_Header; Content: \"Temuan & tindak lanjut\"",
        "prefix": "",
        "help": ""
      },
      {
        "name": "Findings_Description",
        "label": "Uraian temuan",
        "section": "Temuan & tindak lanjut",
        "type": "LongText",
        "options": [],
        "required": "OR(AND([General_Section_Status] = \"Diperiksa\", OR([General_Scanner] = \"Ada masalah\", [General_Camera] = \"Ada masalah\", [General_GPS] = \"Ada masalah\", [General_Battery_Terminals] = \"Ada masalah\", [General_Cleanliness] = \"Ada masalah\", [General_Scan_Obstruction] = \"Ada masalah\")), AND([Genset_Section_Status] = \"Diperiksa\", OR([Genset_Fuel_Level] = \"Ada masalah\", [Genset_Oil_Level] = \"Ada masalah\", [Genset_Fuel_Leak] = \"Ada masalah\", [Genset_Oil_Leak] = \"Ada masalah\", [Genset_Air_Filter] = \"Ada masalah\", [Genset_Oil_Filter] = \"Ada masalah\", [Genset_Fuel_Filter] = \"Ada masalah\", [Genset_Battery_Terminals] = \"Ada masalah\", [Genset_Charging] = \"Ada masalah\", [Genset_Alarm] = \"Ada masalah\")), AND([Controller_Section_Status] = \"Diperiksa\", OR([Controller_Module] = \"Ada masalah\", [Controller_Cables_Connectors] = \"Ada masalah\", [Controller_Alarm] = \"Ada masalah\", [Controller_Camera_Transfer] = \"Ada masalah\", [Controller_WNC_RDP] = \"Ada masalah\", [Controller_PSV_Transmission] = \"Ada masalah\", [Controller_Guardian_Sync] = \"Ada masalah\")), AND([Solar_Section_Status] = \"Diperiksa\", OR([Solar_Cleanliness] = \"Ada masalah\", [Solar_Panel_Condition] = \"Ada masalah\", [Solar_Cables_Connectors] = \"Ada masalah\", [Solar_Mounting] = \"Ada masalah\", [Solar_Surge_Protector] = \"Ada masalah\", [Solar_Charging] = \"Ada masalah\")), AND([Weather_Section_Status] = \"Diperiksa\", OR([Weather_Sensor_Cleanliness] = \"Ada masalah\", [Weather_Mast_Cables_Connectors] = \"Ada masalah\", [Weather_Readings_Available] = \"Ada masalah\")), AND([Trailer_Section_Status] = \"Diperiksa\", OR([Trailer_Wheels_Tyres] = \"Ada masalah\", [Trailer_Exterior_Mounting] = \"Ada masalah\", [Trailer_Tow_Hitch] = \"Ada masalah\", [Trailer_Levelling_Hydraulics] = \"Ada masalah\", [Trailer_Brakes] = \"Ada masalah\", [Trailer_Breakaway_Battery] = \"Ada masalah\", [Trailer_Doors_Gas_Struts] = \"Ada masalah\", [Trailer_Fire_Extinguisher] = \"Ada masalah\", [Trailer_E_Stop_Visual] = \"Ada masalah\", [Trailer_Container_Leaks] = \"Ada masalah\", [Trailer_Container_Screen] = \"Ada masalah\", [Trailer_Container_Cabling] = \"Ada masalah\", [Trailer_Safety_Rails] = \"Ada masalah\")))",
        "show": "TRUE",
        "description": "",
        "prefix": "",
        "help": ""
      },
      {
        "name": "Action_Taken",
        "label": "Tindakan yang dilakukan",
        "section": "Temuan & tindak lanjut",
        "type": "LongText",
        "options": [],
        "required": "FALSE",
        "show": "TRUE",
        "description": "",
        "prefix": "",
        "help": ""
      },
      {
        "name": "Follow_Up_Work",
        "label": "Pekerjaan lanjutan",
        "section": "Temuan & tindak lanjut",
        "type": "LongText",
        "options": [],
        "required": "FALSE",
        "show": "TRUE",
        "description": "",
        "prefix": "",
        "help": ""
      },
      {
        "name": "Follow_Up_PIC",
        "label": "PIC tindak lanjut",
        "section": "Temuan & tindak lanjut",
        "type": "Text",
        "options": [],
        "required": "FALSE",
        "show": "TRUE",
        "description": "",
        "prefix": "",
        "help": ""
      },
      {
        "name": "Follow_Up_Target_Date",
        "label": "Target penyelesaian",
        "section": "Temuan & tindak lanjut",
        "type": "Date",
        "options": [],
        "required": "FALSE",
        "show": "TRUE",
        "description": "",
        "prefix": "",
        "help": ""
      },
      {
        "name": "Findings_Image",
        "label": "Foto tambahan temuan",
        "section": "Temuan & tindak lanjut",
        "type": "Image",
        "options": [],
        "required": "FALSE",
        "show": "TRUE",
        "description": "",
        "prefix": "",
        "help": ""
      },
      {
        "name": "Additional_Notes",
        "label": "Catatan tambahan",
        "section": "Temuan & tindak lanjut",
        "type": "LongText",
        "options": [],
        "required": "FALSE",
        "show": "TRUE",
        "description": "",
        "prefix": "",
        "help": "Wajib untuk masalah atau item yang tidak diperiksa."
      }
    ],
    "sections": [
      "Identitas inspeksi",
      "General",
      "Genset",
      "Modul controller & komunikasi",
      "Solar panel",
      "Weather station",
      "Trailer / container & keselamatan",
      "Temuan & tindak lanjut"
    ]
  },
  "RTS": {
    "type": "RTS",
    "title": "RTS Leica TM60",
    "model": "Leica TM60",
    "fields": [
      {
        "name": "Inspection_ID",
        "label": "ID inspeksi",
        "section": "Identitas inspeksi",
        "type": "Text",
        "options": [],
        "required": "FALSE",
        "prefix": "",
        "help": ""
      },
      {
        "name": "Inspection_DateTime",
        "label": "Tanggal dan jam inspeksi (WIB)",
        "section": "Identitas inspeksi",
        "type": "DateTime",
        "options": [],
        "required": "TRUE",
        "prefix": "",
        "help": ""
      },
      {
        "name": "Technician_Name",
        "label": "Nama field technician",
        "section": "Identitas inspeksi",
        "type": "Text",
        "options": [],
        "required": "TRUE",
        "prefix": "",
        "help": ""
      },
      {
        "name": "RTS_ID",
        "label": "ID unit RTS",
        "section": "Identitas inspeksi",
        "type": "Text",
        "options": [],
        "required": "TRUE",
        "prefix": "",
        "help": ""
      },
      {
        "name": "RTS_Location",
        "label": "Lokasi RTS",
        "section": "Identitas inspeksi",
        "type": "Text",
        "options": [],
        "required": "TRUE",
        "prefix": "",
        "help": ""
      },
      {
        "name": "RTS_Serial_Number",
        "label": "Serial number Leica TM60",
        "section": "Identitas inspeksi",
        "type": "Text",
        "options": [],
        "required": "FALSE",
        "prefix": "",
        "help": ""
      },
      {
        "name": "RTS_Instrument_Section_Status",
        "label": "Status pemeriksaan bagian",
        "section": "Alat RTS Leica TM60",
        "type": "Enum",
        "options": [
          "Diperiksa",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Instrument",
        "help": ""
      },
      {
        "name": "RTS_Instrument_Nivo",
        "label": "Nivo / gelembung dan level elektronik",
        "section": "Alat RTS Leica TM60",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Instrument",
        "help": ""
      },
      {
        "name": "RTS_Instrument_Cleanliness",
        "label": "Kebersihan bodi, lensa, dan jendela EDM/ATR",
        "section": "Alat RTS Leica TM60",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Instrument",
        "help": ""
      },
      {
        "name": "RTS_Instrument_Body",
        "label": "Bodi, cover, dan kerusakan fisik",
        "section": "Alat RTS Leica TM60",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Instrument",
        "help": ""
      },
      {
        "name": "RTS_Instrument_Mount",
        "label": "Tribrach, pengunci, dan pemasangan alat",
        "section": "Alat RTS Leica TM60",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Instrument",
        "help": ""
      },
      {
        "name": "RTS_Instrument_Cable",
        "label": "Kabel power/data dan konektor alat",
        "section": "Alat RTS Leica TM60",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Instrument",
        "help": ""
      },
      {
        "name": "RTS_Instrument_Obstruction",
        "label": "Area rotasi dan line of sight bebas halangan",
        "section": "Alat RTS Leica TM60",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Instrument",
        "help": ""
      },
      {
        "name": "RTS_Instrument_Tilt_Alarm",
        "label": "Indikasi tilt/compensator atau alarm pada display",
        "section": "Alat RTS Leica TM60",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Instrument",
        "help": ""
      },
      {
        "name": "RTS_Instrument_Tilt_X",
        "label": "Pembacaan tilt X",
        "section": "Alat RTS Leica TM60",
        "type": "Decimal",
        "options": [],
        "required": "FALSE",
        "prefix": "RTS_Instrument",
        "help": "Catat pembacaan display; tidak mengubah leveling, resection, atau konfigurasi alat."
      },
      {
        "name": "RTS_Instrument_Tilt_Y",
        "label": "Pembacaan tilt Y",
        "section": "Alat RTS Leica TM60",
        "type": "Decimal",
        "options": [],
        "required": "FALSE",
        "prefix": "RTS_Instrument",
        "help": "Catat pembacaan display; tidak mengubah leveling, resection, atau konfigurasi alat."
      },
      {
        "name": "RTS_Instrument_Tilt_Unit",
        "label": "Satuan tilt sesuai display",
        "section": "Alat RTS Leica TM60",
        "type": "Text",
        "options": [],
        "required": "FALSE",
        "prefix": "RTS_Instrument",
        "help": "Catat pembacaan display; tidak mengubah leveling, resection, atau konfigurasi alat."
      },
      {
        "name": "RTS_Instrument_Notes",
        "label": "Catatan / alasan tidak diperiksa",
        "section": "Alat RTS Leica TM60",
        "type": "LongText",
        "options": [],
        "required": "FALSE",
        "prefix": "RTS_Instrument",
        "help": ""
      },
      {
        "name": "RTS_Instrument_Image",
        "label": "Foto Alat RTS Leica TM60",
        "section": "Alat RTS Leica TM60",
        "type": "Image",
        "options": [],
        "required": "TRUE",
        "prefix": "RTS_Instrument",
        "help": ""
      },
      {
        "name": "RTS_Panel_Section_Status",
        "label": "Status pemeriksaan bagian",
        "section": "Panel & kelistrikan",
        "type": "Enum",
        "options": [
          "Diperiksa",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Panel",
        "help": ""
      },
      {
        "name": "RTS_Panel_Enclosure",
        "label": "Pintu, seal, kunci, dan kebocoran panel",
        "section": "Panel & kelistrikan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Panel",
        "help": ""
      },
      {
        "name": "RTS_Panel_Dryness",
        "label": "Kondisi kering; tidak ada air/kondensasi",
        "section": "Panel & kelistrikan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Panel",
        "help": ""
      },
      {
        "name": "RTS_Panel_Cleanliness",
        "label": "Kebersihan; debu, serangga, dan ventilasi",
        "section": "Panel & kelistrikan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Panel",
        "help": ""
      },
      {
        "name": "RTS_Panel_Wiring",
        "label": "Kerapian kabel, terminal, dan konektor (visual)",
        "section": "Panel & kelistrikan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Panel",
        "help": ""
      },
      {
        "name": "RTS_Panel_Protection",
        "label": "Fuse/MCB, surge protection, dan grounding (visual)",
        "section": "Panel & kelistrikan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Panel",
        "help": ""
      },
      {
        "name": "RTS_Panel_Power_Supply",
        "label": "Power supply dan indikator kelistrikan",
        "section": "Panel & kelistrikan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Panel",
        "help": ""
      },
      {
        "name": "RTS_Panel_Heat_Damage",
        "label": "Tidak ada bekas panas/terbakar atau korosi",
        "section": "Panel & kelistrikan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Panel",
        "help": ""
      },
      {
        "name": "RTS_Panel_Supply_Voltage",
        "label": "Tegangan keluaran power supply (V)",
        "section": "Panel & kelistrikan",
        "type": "Decimal",
        "options": [],
        "required": "FALSE",
        "prefix": "RTS_Panel",
        "help": "Catat pembacaan display; tidak mengubah leveling, resection, atau konfigurasi alat."
      },
      {
        "name": "RTS_Panel_Notes",
        "label": "Catatan / alasan tidak diperiksa",
        "section": "Panel & kelistrikan",
        "type": "LongText",
        "options": [],
        "required": "FALSE",
        "prefix": "RTS_Panel",
        "help": ""
      },
      {
        "name": "RTS_Panel_Image",
        "label": "Foto Panel & kelistrikan",
        "section": "Panel & kelistrikan",
        "type": "Image",
        "options": [],
        "required": "TRUE",
        "prefix": "RTS_Panel",
        "help": ""
      },
      {
        "name": "RTS_Network_Section_Status",
        "label": "Status pemeriksaan bagian",
        "section": "Moxa & jaringan",
        "type": "Enum",
        "options": [
          "Diperiksa",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Network",
        "help": ""
      },
      {
        "name": "RTS_Network_Moxa_Power",
        "label": "Indikator power Moxa",
        "section": "Moxa & jaringan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Network",
        "help": ""
      },
      {
        "name": "RTS_Network_Moxa_Link",
        "label": "Indikator link/activity Moxa",
        "section": "Moxa & jaringan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Network",
        "help": ""
      },
      {
        "name": "RTS_Network_Cables",
        "label": "Kabel ethernet/serial, konektor, dan antena",
        "section": "Moxa & jaringan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Network",
        "help": ""
      },
      {
        "name": "RTS_Network_Acquisition",
        "label": "Status koneksi alat ke sistem akuisisi",
        "section": "Moxa & jaringan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Network",
        "help": ""
      },
      {
        "name": "RTS_Network_Latest_Data",
        "label": "Waktu data terakhir sesuai interval monitoring",
        "section": "Moxa & jaringan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Network",
        "help": ""
      },
      {
        "name": "RTS_Network_Remote",
        "label": "Akses jaringan/remote dari lokasi pemeriksaan",
        "section": "Moxa & jaringan",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Network",
        "help": ""
      },
      {
        "name": "RTS_Network_Last_Data_Time",
        "label": "Waktu data terakhir (WIB)",
        "section": "Moxa & jaringan",
        "type": "DateTime",
        "options": [],
        "required": "FALSE",
        "prefix": "RTS_Network",
        "help": "Catat pembacaan display; tidak mengubah leveling, resection, atau konfigurasi alat."
      },
      {
        "name": "RTS_Network_IP_Label",
        "label": "IP/label jaringan jika diperlukan",
        "section": "Moxa & jaringan",
        "type": "Text",
        "options": [],
        "required": "FALSE",
        "prefix": "RTS_Network",
        "help": "Catat pembacaan display; tidak mengubah leveling, resection, atau konfigurasi alat."
      },
      {
        "name": "RTS_Network_Notes",
        "label": "Catatan / alasan tidak diperiksa",
        "section": "Moxa & jaringan",
        "type": "LongText",
        "options": [],
        "required": "FALSE",
        "prefix": "RTS_Network",
        "help": ""
      },
      {
        "name": "RTS_Network_Image",
        "label": "Foto Moxa & jaringan",
        "section": "Moxa & jaringan",
        "type": "Image",
        "options": [],
        "required": "TRUE",
        "prefix": "RTS_Network",
        "help": ""
      },
      {
        "name": "RTS_Solar_Section_Status",
        "label": "Status pemeriksaan bagian",
        "section": "Solar panel",
        "type": "Enum",
        "options": [
          "Diperiksa",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Solar",
        "help": ""
      },
      {
        "name": "RTS_Solar_Cleanliness",
        "label": "Kebersihan permukaan solar panel",
        "section": "Solar panel",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Solar",
        "help": ""
      },
      {
        "name": "RTS_Solar_Damage",
        "label": "Kaca/frame dan kerusakan panel",
        "section": "Solar panel",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Solar",
        "help": ""
      },
      {
        "name": "RTS_Solar_Shade",
        "label": "Tidak ada bayangan/halangan pada panel",
        "section": "Solar panel",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Solar",
        "help": ""
      },
      {
        "name": "RTS_Solar_Mount",
        "label": "Dudukan, baut, dan arah panel (visual)",
        "section": "Solar panel",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Solar",
        "help": ""
      },
      {
        "name": "RTS_Solar_Cables",
        "label": "Kabel, konektor, dan jalur ke controller",
        "section": "Solar panel",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Solar",
        "help": ""
      },
      {
        "name": "RTS_Solar_Voltage",
        "label": "Tegangan panel pada display (V)",
        "section": "Solar panel",
        "type": "Decimal",
        "options": [],
        "required": "FALSE",
        "prefix": "RTS_Solar",
        "help": "Catat pembacaan display; tidak mengubah leveling, resection, atau konfigurasi alat."
      },
      {
        "name": "RTS_Solar_Current",
        "label": "Arus panel pada display (A)",
        "section": "Solar panel",
        "type": "Decimal",
        "options": [],
        "required": "FALSE",
        "prefix": "RTS_Solar",
        "help": "Catat pembacaan display; tidak mengubah leveling, resection, atau konfigurasi alat."
      },
      {
        "name": "RTS_Solar_Notes",
        "label": "Catatan / alasan tidak diperiksa",
        "section": "Solar panel",
        "type": "LongText",
        "options": [],
        "required": "FALSE",
        "prefix": "RTS_Solar",
        "help": ""
      },
      {
        "name": "RTS_Solar_Image",
        "label": "Foto Solar panel",
        "section": "Solar panel",
        "type": "Image",
        "options": [],
        "required": "TRUE",
        "prefix": "RTS_Solar",
        "help": ""
      },
      {
        "name": "RTS_Power_Section_Status",
        "label": "Status pemeriksaan bagian",
        "section": "Baterai & charge controller",
        "type": "Enum",
        "options": [
          "Diperiksa",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Power",
        "help": ""
      },
      {
        "name": "RTS_Power_Controller",
        "label": "Indikator/status charge controller",
        "section": "Baterai & charge controller",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Power",
        "help": ""
      },
      {
        "name": "RTS_Power_Battery",
        "label": "Kondisi baterai: casing, kebocoran, atau bengkak",
        "section": "Baterai & charge controller",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Power",
        "help": ""
      },
      {
        "name": "RTS_Power_Terminals",
        "label": "Terminal, korosi, dan koneksi baterai (visual)",
        "section": "Baterai & charge controller",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Power",
        "help": ""
      },
      {
        "name": "RTS_Power_Charging",
        "label": "Status pengisian dan suplai ke RTS",
        "section": "Baterai & charge controller",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Power",
        "help": ""
      },
      {
        "name": "RTS_Power_Battery_Voltage",
        "label": "Tegangan baterai pada display (V)",
        "section": "Baterai & charge controller",
        "type": "Decimal",
        "options": [],
        "required": "FALSE",
        "prefix": "RTS_Power",
        "help": "Catat pembacaan display; tidak mengubah leveling, resection, atau konfigurasi alat."
      },
      {
        "name": "RTS_Power_Charge_Current",
        "label": "Arus pengisian pada display (A)",
        "section": "Baterai & charge controller",
        "type": "Decimal",
        "options": [],
        "required": "FALSE",
        "prefix": "RTS_Power",
        "help": "Catat pembacaan display; tidak mengubah leveling, resection, atau konfigurasi alat."
      },
      {
        "name": "RTS_Power_Notes",
        "label": "Catatan / alasan tidak diperiksa",
        "section": "Baterai & charge controller",
        "type": "LongText",
        "options": [],
        "required": "FALSE",
        "prefix": "RTS_Power",
        "help": ""
      },
      {
        "name": "RTS_Power_Image",
        "label": "Foto Baterai & charge controller",
        "section": "Baterai & charge controller",
        "type": "Image",
        "options": [],
        "required": "TRUE",
        "prefix": "RTS_Power",
        "help": ""
      },
      {
        "name": "RTS_Site_Section_Status",
        "label": "Status pemeriksaan bagian",
        "section": "Dudukan & area",
        "type": "Enum",
        "options": [
          "Diperiksa",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Site",
        "help": ""
      },
      {
        "name": "RTS_Site_Pillar",
        "label": "Pilar/dudukan: retak, longgar, atau perubahan kondisi",
        "section": "Dudukan & area",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Site",
        "help": ""
      },
      {
        "name": "RTS_Site_Foundation",
        "label": "Fondasi/area sekitar: erosi, genangan, atau gangguan",
        "section": "Dudukan & area",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Site",
        "help": ""
      },
      {
        "name": "RTS_Site_Shelter",
        "label": "Shelter/pelindung cuaca dan drainase",
        "section": "Dudukan & area",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Site",
        "help": ""
      },
      {
        "name": "RTS_Site_Safety",
        "label": "Akses, pagar/tanda, dan kondisi aman area",
        "section": "Dudukan & area",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Site",
        "help": ""
      },
      {
        "name": "RTS_Site_Prism",
        "label": "Prisma referensi/backsight terlihat dari posisi inspeksi (jika tersedia)",
        "section": "Dudukan & area",
        "type": "Enum",
        "options": [
          "Baik",
          "Ada masalah",
          "Tidak diperiksa",
          "Tidak berlaku (N/A)"
        ],
        "required": "TRUE",
        "prefix": "RTS_Site",
        "help": ""
      },
      {
        "name": "RTS_Site_Notes",
        "label": "Catatan / alasan tidak diperiksa",
        "section": "Dudukan & area",
        "type": "LongText",
        "options": [],
        "required": "FALSE",
        "prefix": "RTS_Site",
        "help": ""
      },
      {
        "name": "RTS_Site_Image",
        "label": "Foto Dudukan & area",
        "section": "Dudukan & area",
        "type": "Image",
        "options": [],
        "required": "TRUE",
        "prefix": "RTS_Site",
        "help": ""
      },
      {
        "name": "Findings_Description",
        "label": "Uraian temuan",
        "section": "Temuan & tindak lanjut",
        "type": "LongText",
        "options": [],
        "required": "FALSE",
        "prefix": "",
        "help": ""
      },
      {
        "name": "Recommended_Action",
        "label": "Tindak lanjut yang diperlukan",
        "section": "Temuan & tindak lanjut",
        "type": "LongText",
        "options": [],
        "required": "FALSE",
        "prefix": "",
        "help": ""
      },
      {
        "name": "Action_PIC",
        "label": "PIC tindak lanjut",
        "section": "Temuan & tindak lanjut",
        "type": "Text",
        "options": [],
        "required": "FALSE",
        "prefix": "",
        "help": ""
      },
      {
        "name": "Action_Due_Date",
        "label": "Target tindak lanjut",
        "section": "Temuan & tindak lanjut",
        "type": "Date",
        "options": [],
        "required": "FALSE",
        "prefix": "",
        "help": ""
      },
      {
        "name": "Findings_Image",
        "label": "Foto tambahan temuan",
        "section": "Temuan & tindak lanjut",
        "type": "Image",
        "options": [],
        "required": "FALSE",
        "prefix": "",
        "help": ""
      }
    ],
    "sections": [
      "Identitas inspeksi",
      "Alat RTS Leica TM60",
      "Panel & kelistrikan",
      "Moxa & jaringan",
      "Solar panel",
      "Baterai & charge controller",
      "Dudukan & area",
      "Temuan & tindak lanjut"
    ]
  }
};
function schema_(type) { if (!Object.prototype.hasOwnProperty.call(WI_SCHEMAS_, type)) throw new Error("Jenis inspeksi tidak valid."); return WI_SCHEMAS_[type]; }
