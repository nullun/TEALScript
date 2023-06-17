import algosdk from "algosdk";
import * as bkr from "beaker-ts";
export class ContactsApp extends bkr.ApplicationClient {
    desc: string = "";
    override appSchema: bkr.Schema = { declared: { myContact: { type: bkr.AVMType.bytes, key: "myContact", desc: "", static: false } }, reserved: {} };
    override acctSchema: bkr.Schema = { declared: {}, reserved: {} };
    override approvalProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKCWIgbWFpbgoKZ2V0X2xlbmd0aF9kaWZmZXJlbmNlOgoJbG9hZCAzIC8vIG5ldyBlbGVtZW50CglsZW4gLy8gbGVuZ3RoIG9mIG5ldyBlbGVtZW50Cglsb2FkIDIgLy8gZWxlbWVudCBsZW5ndGgKCTwKCWJueiBzd2FwcGVkX2RpZmZlcmVuY2UKCWxvYWQgMyAvLyBuZXcgZWxlbWVudAoJbGVuIC8vIGxlbmd0aCBvZiBuZXcgZWxlbWVudAoJbG9hZCAyIC8vIGVsZW1lbnQgbGVuZ3RoCglpbnQgMQoJc3RvcmUgNyAvLyBzdWJ0cmFjdCBoZWFkIGRpZmZlcmVuY2UKCWIgZ2V0X2RpZmZlcmVuY2UKCnN3YXBwZWRfZGlmZmVyZW5jZToKCWxvYWQgMiAvLyBlbGVtZW50IGxlbmd0aAoJbG9hZCAzIC8vIG5ldyBlbGVtZW50CglsZW4gLy8gbGVuZ3RoIG9mIG5ldyBlbGVtZW50CglpbnQgMAoJc3RvcmUgNyAvLyBzdWJ0cmFjdCBoZWFkIGRpZmZlcmVuY2UKCmdldF9kaWZmZXJlbmNlOgoJLSAvLyBnZXQgbGVuZ3RoIGRpZmZlcmVuY2UKCXN0b3JlIDUgLy8gbGVuZ3RoIGRpZmZlcmVuY2UKCXJldHN1YgoKdXBkYXRlX2R5bmFtaWNfaGVhZDoKCXByb3RvIDIgMAoJZnJhbWVfZGlnIC0yIC8vIGxlbmd0aCBkaWZmZXJlbmNlCglsb2FkIDAgLy8gZnVsbCBhcnJheQoJZnJhbWVfZGlnIC0xIC8vIGR5bmFtaWMgYXJyYXkgb2Zmc2V0CglleHRyYWN0X3VpbnQxNiAvLyBleHRyYWN0IGR5bmFtaWMgYXJyYXkgb2Zmc2V0Cglsb2FkIDcgLy8gc3VidHJhY3QgaGVhZCBkaWZmZXJlbmNlCglieiBzdWJ0cmFjdF9oZWFkX2RpZmZlcmVuY2UKCSsgLy8gYWRkIGRpZmZlcmVuY2UgdG8gb2Zmc2V0CgliIGVuZF9jYWxjX25ld19oZWFkCgpzdWJ0cmFjdF9oZWFkX2RpZmZlcmVuY2U6Cglzd2FwCgktIC8vIHN1YnRyYWN0IGRpZmZlcmVuY2UgZnJvbSBvZmZldAoKZW5kX2NhbGNfbmV3X2hlYWQ6CglpdG9iIC8vIGNvbnZlcnQgdG8gYnl0ZXMKCWV4dHJhY3QgNiAyIC8vIGNvbnZlcnQgdG8gdWludDE2Cglsb2FkIDAgLy8gZnVsbCBhcnJheQoJc3dhcAoJZnJhbWVfZGlnIC0xIC8vIG9mZnNldAoJc3dhcAoJcmVwbGFjZTMgLy8gdXBkYXRlIG9mZnNldAoJc3RvcmUgMCAvLyBmdWxsIGFycmF5CglyZXRzdWIKCnByb2Nlc3NfZHluYW1pY190dXBsZV9lbGVtZW50OgoJcHJvdG8gNCAzCglmcmFtZV9kaWcgLTQgLy8gdHVwbGUgaGVhZAoJZnJhbWVfZGlnIC0yIC8vIGhlYWQgb2Zmc2V0Cgljb25jYXQKCWZyYW1lX2J1cnkgLTQgLy8gdHVwbGUgaGVhZAoJZnJhbWVfZGlnIC0xIC8vIGVsZW1lbnQKCWR1cAoJbGVuCglmcmFtZV9kaWcgLTIgLy8gaGVhZCBvZmZzZXQKCWJ0b2kKCSsKCWl0b2IKCWV4dHJhY3QgNiAyCglmcmFtZV9idXJ5IC0yIC8vIGhlYWQgb2Zmc2V0CglmcmFtZV9kaWcgLTMgLy8gdHVwbGUgdGFpbAoJc3dhcAoJY29uY2F0CglmcmFtZV9idXJ5IC0zIC8vIHR1cGxlIHRhaWwKCWZyYW1lX2RpZyAtNCAvLyB0dXBsZSBoZWFkCglmcmFtZV9kaWcgLTMgLy8gdHVwbGUgdGFpbAoJZnJhbWVfZGlnIC0yIC8vIGhlYWQgb2Zmc2V0CglyZXRzdWIKCmFiaV9yb3V0ZV9zZXRNeUNvbnRhY3Q6Cgl0eG4gT25Db21wbGV0aW9uCglpbnQgTm9PcAoJPT0KCXR4biBBcHBsaWNhdGlvbklECglpbnQgMAoJIT0KCSYmCglhc3NlcnQKCWJ5dGUgMHgKCXR4bmEgQXBwbGljYXRpb25BcmdzIDIKCWV4dHJhY3QgMiAwCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAxCglleHRyYWN0IDIgMAoJY2FsbHN1YiBzZXRNeUNvbnRhY3QKCWludCAxCglyZXR1cm4KCnNldE15Q29udGFjdDoKCXByb3RvIDMgMAoKCS8vIGV4YW1wbGVzL3R1cGxlX2luX2JveC9hcHAuYWxnby50czoxMgoJLy8gY29udGFjdDogQ29udGFjdCA9IHsgbmFtZTogbmFtZSwgY29tcGFueTogY29tcGFueSB9CglieXRlIDB4IC8vIGluaXRpYWwgaGVhZAoJYnl0ZSAweCAvLyBpbml0aWFsIHRhaWwKCWJ5dGUgMHgwMDA0IC8vIGluaXRpYWwgaGVhZCBvZmZzZXQKCWZyYW1lX2RpZyAtMSAvLyBuYW1lOiBieXRlcwoJZHVwCglsZW4KCWl0b2IKCWV4dHJhY3QgNiAyCglzd2FwCgljb25jYXQKCWNhbGxzdWIgcHJvY2Vzc19keW5hbWljX3R1cGxlX2VsZW1lbnQKCWZyYW1lX2RpZyAtMiAvLyBjb21wYW55OiBieXRlcwoJZHVwCglsZW4KCWl0b2IKCWV4dHJhY3QgNiAyCglzd2FwCgljb25jYXQKCWNhbGxzdWIgcHJvY2Vzc19keW5hbWljX3R1cGxlX2VsZW1lbnQKCXBvcCAvLyBwb3AgaGVhZCBvZmZzZXQKCWNvbmNhdCAvLyBjb25jYXQgaGVhZCBhbmQgdGFpbAoJZnJhbWVfYnVyeSAtMyAvLyBjb250YWN0OiBDb250YWN0CgoJLy8gZXhhbXBsZXMvdHVwbGVfaW5fYm94L2FwcC5hbGdvLnRzOjE0CgkvLyB0aGlzLm15Q29udGFjdC5wdXQoY29udGFjdCkKCWJ5dGUgIm15Q29udGFjdCIKCWZyYW1lX2RpZyAtMyAvLyBjb250YWN0OiBDb250YWN0CglhcHBfZ2xvYmFsX3B1dAoKCS8vIGV4YW1wbGVzL3R1cGxlX2luX2JveC9hcHAuYWxnby50czoxNQoJLy8gdGhpcy5jb250YWN0cy5wdXQodGhpcy50eG4uc2VuZGVyLCBjb250YWN0KQoJdHhuIFNlbmRlcgoJZHVwCglib3hfZGVsCglwb3AKCWZyYW1lX2RpZyAtMyAvLyBjb250YWN0OiBDb250YWN0Cglib3hfcHV0CglyZXRzdWIKCmFiaV9yb3V0ZV9hZGRDb250YWN0OgoJdHhuIE9uQ29tcGxldGlvbgoJaW50IE5vT3AKCT09Cgl0eG4gQXBwbGljYXRpb25JRAoJaW50IDAKCSE9CgkmJgoJYXNzZXJ0CglieXRlIDB4Cgl0eG5hIEFwcGxpY2F0aW9uQXJncyAzCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAyCglleHRyYWN0IDIgMAoJdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQoJZXh0cmFjdCAyIDAKCWNhbGxzdWIgYWRkQ29udGFjdAoJaW50IDEKCXJldHVybgoKYWRkQ29udGFjdDoKCXByb3RvIDQgMAoKCS8vIGV4YW1wbGVzL3R1cGxlX2luX2JveC9hcHAuYWxnby50czoxOQoJLy8gY29udGFjdDogQ29udGFjdCA9IHsgbmFtZTogbmFtZSwgY29tcGFueTogY29tcGFueSB9CglieXRlIDB4IC8vIGluaXRpYWwgaGVhZAoJYnl0ZSAweCAvLyBpbml0aWFsIHRhaWwKCWJ5dGUgMHgwMDA0IC8vIGluaXRpYWwgaGVhZCBvZmZzZXQKCWZyYW1lX2RpZyAtMSAvLyBuYW1lOiBieXRlcwoJZHVwCglsZW4KCWl0b2IKCWV4dHJhY3QgNiAyCglzd2FwCgljb25jYXQKCWNhbGxzdWIgcHJvY2Vzc19keW5hbWljX3R1cGxlX2VsZW1lbnQKCWZyYW1lX2RpZyAtMiAvLyBjb21wYW55OiBieXRlcwoJZHVwCglsZW4KCWl0b2IKCWV4dHJhY3QgNiAyCglzd2FwCgljb25jYXQKCWNhbGxzdWIgcHJvY2Vzc19keW5hbWljX3R1cGxlX2VsZW1lbnQKCXBvcCAvLyBwb3AgaGVhZCBvZmZzZXQKCWNvbmNhdCAvLyBjb25jYXQgaGVhZCBhbmQgdGFpbAoJZnJhbWVfYnVyeSAtNCAvLyBjb250YWN0OiBDb250YWN0CgoJLy8gZXhhbXBsZXMvdHVwbGVfaW5fYm94L2FwcC5hbGdvLnRzOjIwCgkvLyB0aGlzLmNvbnRhY3RzLnB1dChhZGRyZXNzLCBjb250YWN0KQoJZnJhbWVfZGlnIC0zIC8vIGFkZHJlc3M6IGFkZHJlc3MKCWR1cAoJYm94X2RlbAoJcG9wCglmcmFtZV9kaWcgLTQgLy8gY29udGFjdDogQ29udGFjdAoJYm94X3B1dAoJcmV0c3ViCgphYmlfcm91dGVfdXBkYXRlQ29udGFjdEZpZWxkOgoJdHhuIE9uQ29tcGxldGlvbgoJaW50IE5vT3AKCT09Cgl0eG4gQXBwbGljYXRpb25JRAoJaW50IDAKCSE9CgkmJgoJYXNzZXJ0Cgl0eG5hIEFwcGxpY2F0aW9uQXJncyAzCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAyCglleHRyYWN0IDIgMAoJdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQoJZXh0cmFjdCAyIDAKCWNhbGxzdWIgdXBkYXRlQ29udGFjdEZpZWxkCglpbnQgMQoJcmV0dXJuCgp1cGRhdGVDb250YWN0RmllbGQ6Cglwcm90byAzIDAKCgkvLyBpZjBfY29uZGl0aW9uCgkvLyBleGFtcGxlcy90dXBsZV9pbl9ib3gvYXBwLmFsZ28udHM6MjQKCS8vIGZpZWxkID09PSAnbmFtZScKCWZyYW1lX2RpZyAtMSAvLyBmaWVsZDogYnl0ZXMKCWJ5dGUgIm5hbWUiCgk9PQoJYnogaWYwX2Vsc2VpZjFfY29uZGl0aW9uCgoJLy8gaWYwX2NvbnNlcXVlbnQKCS8vIGV4YW1wbGVzL3R1cGxlX2luX2JveC9hcHAuYWxnby50czoyNQoJLy8gdGhpcy5jb250YWN0cy5nZXQoYWRkcmVzcykubmFtZSA9IHZhbHVlCgkvLyBleGFtcGxlcy90dXBsZV9pbl9ib3gvYXBwLmFsZ28udHM6MQoJLy8gdGhpcy5jb250YWN0cy5nZXQoYWRkcmVzcykKCWZyYW1lX2RpZyAtMyAvLyBhZGRyZXNzOiBhZGRyZXNzCglib3hfZ2V0Cglhc3NlcnQKCXN0b3JlIDAgLy8gZnVsbCBhcnJheQoJaW50IDAgLy8gaW5pdGlhbCBvZmZzZXQKCWludCAwCglpbnQgMgoJKiAvLyBhY2MgKiAyCgkrCglkdXAKCXN0b3JlIDQgLy8gZWxlbWVudCBoZWFkIG9mZnNldAoJbG9hZCAwIC8vIGZ1bGwgYXJyYXkKCWxvYWQgMCAvLyBmdWxsIGFycmF5Cgl1bmNvdmVyIDIKCWV4dHJhY3RfdWludDE2CglkdXAKCXN0b3JlIDEgLy8gZWxlbWVudCBzdGFydAoJZHVwIC8vIGR1cGxpY2F0ZSBzdGFydCBvZiBlbGVtZW50Cglsb2FkIDAgLy8gZnVsbCBhcnJheQoJc3dhcAoJZXh0cmFjdF91aW50MTYgLy8gZ2V0IG51bWJlciBvZiBlbGVtZW50cwoJaW50IDEgLy8gZ2V0IHR5cGUgbGVuZ3RoCgkqIC8vIG11bHRpcGx5IGJ5IHR5cGUgbGVuZ3RoCglpbnQgMgoJKyAvLyBhZGQgdHdvIGZvciBsZW5ndGgKCXN0b3JlIDIgLy8gZWxlbWVudCBsZW5ndGgKCWxvYWQgMCAvLyBmdWxsIGFycmF5CglpbnQgMAoJbG9hZCAxIC8vIGVsZW1lbnQgc3RhcnQKCXN1YnN0cmluZzMKCWZyYW1lX2RpZyAtMiAvLyB2YWx1ZTogYnl0ZXMKCWR1cAoJbGVuCglpdG9iCglleHRyYWN0IDYgMgoJc3dhcAoJY29uY2F0CglkdXAKCXN0b3JlIDMgLy8gbmV3IGVsZW1lbnQKCWxvYWQgMCAvLyBmdWxsIGFycmF5Cglsb2FkIDEgLy8gZWxlbWVudCBzdGFydAoJbG9hZCAyIC8vIGVsZW1lbnQgbGVuZ3RoCgkrIC8vIGdldCBlbmQgb2YgRWxlbWVudAoJbG9hZCAwIC8vIGZ1bGwgYXJyYXkKCWxlbgoJc3Vic3RyaW5nMwoJY29uY2F0Cgljb25jYXQKCXN0b3JlIDAgLy8gZnVsbCBhcnJheQoJY2FsbHN1YiBnZXRfbGVuZ3RoX2RpZmZlcmVuY2UKCWxvYWQgNSAvLyBsZW5ndGggZGlmZmVyZW5jZQoJbG9hZCA0IC8vIGVsZW1lbnQgaGVhZCBvZmZzZXQKCWludCAyCgkrIC8vIGhlYWQgb2ZzZXQKCWNhbGxzdWIgdXBkYXRlX2R5bmFtaWNfaGVhZAoJbG9hZCAwIC8vIGZ1bGwgYXJyYXkKCWZyYW1lX2RpZyAtMyAvLyBhZGRyZXNzOiBhZGRyZXNzCglkdXAKCWJveF9kZWwKCXBvcAoJc3dhcAoJYm94X3B1dAoJYiBpZjBfZW5kCgppZjBfZWxzZWlmMV9jb25kaXRpb246CgkvLyBleGFtcGxlcy90dXBsZV9pbl9ib3gvYXBwLmFsZ28udHM6MjYKCS8vIGZpZWxkID09PSAnY29tcGFueScKCWZyYW1lX2RpZyAtMSAvLyBmaWVsZDogYnl0ZXMKCWJ5dGUgImNvbXBhbnkiCgk9PQoJYnogaWYwX2Vsc2UKCgkvLyBpZjBfZWxzZWlmMV9jb25zZXF1ZW50CgkvLyBleGFtcGxlcy90dXBsZV9pbl9ib3gvYXBwLmFsZ28udHM6MjcKCS8vIHRoaXMuY29udGFjdHMuZ2V0KGFkZHJlc3MpLmNvbXBhbnkgPSB2YWx1ZQoJLy8gZXhhbXBsZXMvdHVwbGVfaW5fYm94L2FwcC5hbGdvLnRzOjEKCS8vIHRoaXMuY29udGFjdHMuZ2V0KGFkZHJlc3MpCglmcmFtZV9kaWcgLTMgLy8gYWRkcmVzczogYWRkcmVzcwoJYm94X2dldAoJYXNzZXJ0CglzdG9yZSAwIC8vIGZ1bGwgYXJyYXkKCWludCAwIC8vIGluaXRpYWwgb2Zmc2V0CglpbnQgMQoJaW50IDIKCSogLy8gYWNjICogMgoJKwoJZHVwCglzdG9yZSA0IC8vIGVsZW1lbnQgaGVhZCBvZmZzZXQKCWxvYWQgMCAvLyBmdWxsIGFycmF5Cglsb2FkIDAgLy8gZnVsbCBhcnJheQoJdW5jb3ZlciAyCglleHRyYWN0X3VpbnQxNgoJZHVwCglzdG9yZSAxIC8vIGVsZW1lbnQgc3RhcnQKCWR1cCAvLyBkdXBsaWNhdGUgc3RhcnQgb2YgZWxlbWVudAoJbG9hZCAwIC8vIGZ1bGwgYXJyYXkKCXN3YXAKCWV4dHJhY3RfdWludDE2IC8vIGdldCBudW1iZXIgb2YgZWxlbWVudHMKCWludCAxIC8vIGdldCB0eXBlIGxlbmd0aAoJKiAvLyBtdWx0aXBseSBieSB0eXBlIGxlbmd0aAoJaW50IDIKCSsgLy8gYWRkIHR3byBmb3IgbGVuZ3RoCglzdG9yZSAyIC8vIGVsZW1lbnQgbGVuZ3RoCglsb2FkIDAgLy8gZnVsbCBhcnJheQoJaW50IDAKCWxvYWQgMSAvLyBlbGVtZW50IHN0YXJ0CglzdWJzdHJpbmczCglmcmFtZV9kaWcgLTIgLy8gdmFsdWU6IGJ5dGVzCglkdXAKCWxlbgoJaXRvYgoJZXh0cmFjdCA2IDIKCXN3YXAKCWNvbmNhdAoJZHVwCglzdG9yZSAzIC8vIG5ldyBlbGVtZW50Cglsb2FkIDAgLy8gZnVsbCBhcnJheQoJbG9hZCAxIC8vIGVsZW1lbnQgc3RhcnQKCWxvYWQgMiAvLyBlbGVtZW50IGxlbmd0aAoJKyAvLyBnZXQgZW5kIG9mIEVsZW1lbnQKCWxvYWQgMCAvLyBmdWxsIGFycmF5CglsZW4KCXN1YnN0cmluZzMKCWNvbmNhdAoJY29uY2F0CglzdG9yZSAwIC8vIGZ1bGwgYXJyYXkKCWNhbGxzdWIgZ2V0X2xlbmd0aF9kaWZmZXJlbmNlCglsb2FkIDAgLy8gZnVsbCBhcnJheQoJZnJhbWVfZGlnIC0zIC8vIGFkZHJlc3M6IGFkZHJlc3MKCWR1cAoJYm94X2RlbAoJcG9wCglzd2FwCglib3hfcHV0CgliIGlmMF9lbmQKCmlmMF9lbHNlOgoJZXJyIC8vICdJbnZhbGlkIGZpZWxkJwoKaWYwX2VuZDoKCXJldHN1YgoKYWJpX3JvdXRlX3ZlcmlmeUNvbnRhY3ROYW1lOgoJdHhuIE9uQ29tcGxldGlvbgoJaW50IE5vT3AKCT09Cgl0eG4gQXBwbGljYXRpb25JRAoJaW50IDAKCSE9CgkmJgoJYXNzZXJ0Cgl0eG5hIEFwcGxpY2F0aW9uQXJncyAyCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAxCglleHRyYWN0IDIgMAoJY2FsbHN1YiB2ZXJpZnlDb250YWN0TmFtZQoJaW50IDEKCXJldHVybgoKdmVyaWZ5Q29udGFjdE5hbWU6Cglwcm90byAyIDAKCgkvLyBleGFtcGxlcy90dXBsZV9pbl9ib3gvYXBwLmFsZ28udHM6MzIKCS8vIGFzc2VydCh0aGlzLmNvbnRhY3RzLmdldChhZGRyZXNzKS5uYW1lID09PSBuYW1lKQoJZnJhbWVfZGlnIC0yIC8vIGFkZHJlc3M6IGFkZHJlc3MKCWJveF9nZXQKCWFzc2VydAoJZnJhbWVfZGlnIC0yIC8vIGFkZHJlc3M6IGFkZHJlc3MKCWJveF9nZXQKCWFzc2VydAoJc3RvcmUgMCAvLyBmdWxsIGFycmF5CglpbnQgMCAvLyBpbml0aWFsIG9mZnNldAoJaW50IDAKCWludCAyCgkqIC8vIGFjYyAqIDIKCSsKCWxvYWQgMCAvLyBmdWxsIGFycmF5Cglsb2FkIDAgLy8gZnVsbCBhcnJheQoJdW5jb3ZlciAyCglleHRyYWN0X3VpbnQxNgoJZHVwIC8vIGR1cGxpY2F0ZSBzdGFydCBvZiBlbGVtZW50Cglsb2FkIDAgLy8gZnVsbCBhcnJheQoJc3dhcAoJZXh0cmFjdF91aW50MTYgLy8gZ2V0IG51bWJlciBvZiBlbGVtZW50cwoJaW50IDEgLy8gZ2V0IHR5cGUgbGVuZ3RoCgkqIC8vIG11bHRpcGx5IGJ5IHR5cGUgbGVuZ3RoCglpbnQgMgoJKyAvLyBhZGQgdHdvIGZvciBsZW5ndGgKCWV4dHJhY3QzCglleHRyYWN0IDIgMAoJZnJhbWVfZGlnIC0xIC8vIG5hbWU6IGJ5dGVzCgk9PQoJYXNzZXJ0CglyZXRzdWIKCm1haW46Cgl0eG4gTnVtQXBwQXJncwoJYm56IHJvdXRlX2FiaQoKCS8vIGRlZmF1bHQgY3JlYXRlQXBwbGljYXRpb24KCXR4biBBcHBsaWNhdGlvbklECglpbnQgMAoJPT0KCXR4biBPbkNvbXBsZXRpb24KCWludCBOb09wCgk9PQoJJiYKCXJldHVybgoKcm91dGVfYWJpOgoJbWV0aG9kICJzZXRNeUNvbnRhY3Qoc3RyaW5nLHN0cmluZyl2b2lkIgoJbWV0aG9kICJhZGRDb250YWN0KHN0cmluZyxzdHJpbmcsYWRkcmVzcyl2b2lkIgoJbWV0aG9kICJ1cGRhdGVDb250YWN0RmllbGQoc3RyaW5nLHN0cmluZyxhZGRyZXNzKXZvaWQiCgltZXRob2QgInZlcmlmeUNvbnRhY3ROYW1lKHN0cmluZyxhZGRyZXNzKXZvaWQiCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAwCgltYXRjaCBhYmlfcm91dGVfc2V0TXlDb250YWN0IGFiaV9yb3V0ZV9hZGRDb250YWN0IGFiaV9yb3V0ZV91cGRhdGVDb250YWN0RmllbGQgYWJpX3JvdXRlX3ZlcmlmeUNvbnRhY3ROYW1l";
    override clearProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKaW50IDEKcmV0dXJu";
    override methods: algosdk.ABIMethod[] = [
        new algosdk.ABIMethod({ name: "setMyContact", desc: "", args: [{ type: "string", name: "name", desc: "" }, { type: "string", name: "company", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "addContact", desc: "", args: [{ type: "string", name: "name", desc: "" }, { type: "string", name: "company", desc: "" }, { type: "address", name: "address", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "updateContactField", desc: "", args: [{ type: "string", name: "field", desc: "" }, { type: "string", name: "value", desc: "" }, { type: "address", name: "address", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "verifyContactName", desc: "", args: [{ type: "string", name: "name", desc: "" }, { type: "address", name: "address", desc: "" }], returns: { type: "void", desc: "" } })
    ];
    async setMyContact(args: {
        name: string;
        company: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.setMyContact({ name: args.name, company: args.company }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async addContact(args: {
        name: string;
        company: string;
        address: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.addContact({ name: args.name, company: args.company, address: args.address }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async updateContactField(args: {
        field: string;
        value: string;
        address: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.updateContactField({ field: args.field, value: args.value, address: args.address }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async verifyContactName(args: {
        name: string;
        address: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.verifyContactName({ name: args.name, address: args.address }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    compose = {
        setMyContact: async (args: {
            name: string;
            company: string;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "setMyContact"), { name: args.name, company: args.company }, txnParams, atc);
        },
        addContact: async (args: {
            name: string;
            company: string;
            address: string;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "addContact"), { name: args.name, company: args.company, address: args.address }, txnParams, atc);
        },
        updateContactField: async (args: {
            field: string;
            value: string;
            address: string;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "updateContactField"), { field: args.field, value: args.value, address: args.address }, txnParams, atc);
        },
        verifyContactName: async (args: {
            name: string;
            address: string;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "verifyContactName"), { name: args.name, address: args.address }, txnParams, atc);
        }
    };
}