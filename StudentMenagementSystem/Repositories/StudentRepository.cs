using Microsoft.EntityFrameworkCore;
using StudentMenagementSystem.Controllers;
using StudentMenagementSystem.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace StudentMenagementSystem.Repositories
{
    public class StudentRepository : IStudentRepository
    {
        private readonly StudentContext _context;
        public StudentRepository(StudentContext context)
        {
            _context = context;
        }

        public async Task<Student> Create(Student student)
        {
            _context.Students.Add(student);
            await _context.SaveChangesAsync();
            return student;
        }

        public SuccesfulResult Delete(int id)
        {
            try
            {
                Student std = _context.Students.Where((stu) => stu.Id == id).FirstOrDefault();
                _context.Students.Remove(std);
                 _context.SaveChangesAsync();
                return new SuccesfulResult() { result = true };
            }
            catch
            {
                return new SuccesfulResult() { result = false };
            }

        }

        public async Task<IEnumerable<Student>> Get()
        {
            return await _context.Students.ToListAsync();
        }

        public async Task<Student> Get(int id)
        {
            return await _context.Students.FindAsync(id);
        }

        public async Task Update(Student student)
        {
            _context.Entry(student).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public SuccesfulResult CheckCredentials(Student student)
        {
            Student std = _context.Students.Where((stu) => stu.NID == student.NID).FirstOrDefault();
            if (std.Password == student.Password)
            {
                return new SuccesfulResult() { result = true };
            }
            return new SuccesfulResult() { result = false };
        }

        //public static string Encrypt(string clearText)
        //{
        //    string EncryptionKey = "abc123";
        //    byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
        //    using (Aes encryptor = Aes.Create())
        //    {
        //        Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
        //        encryptor.Key = pdb.GetBytes(32);
        //        encryptor.IV = pdb.GetBytes(16);
        //        using (MemoryStream ms = new MemoryStream())
        //        {
        //            using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
        //            {
        //                cs.Write(clearBytes, 0, clearBytes.Length);
        //                cs.Close();
        //            }
        //            clearText = Convert.ToBase64String(ms.ToArray());
        //        }
        //    }
        //    return clearText;
        //}
        //public static string Decrypt(string cipherText)
        //{
        //    string EncryptionKey = "abc123";
        //    cipherText = cipherText.Replace(" ", "+");
        //    byte[] cipherBytes = Convert.FromBase64String(cipherText);
        //    using (Aes encryptor = Aes.Create())
        //    {
        //        Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
        //        encryptor.Key = pdb.GetBytes(32);
        //        encryptor.IV = pdb.GetBytes(16);
        //        using (MemoryStream ms = new MemoryStream())
        //        {
        //            using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
        //            {
        //                cs.Write(cipherBytes, 0, cipherBytes.Length);
        //                cs.Close();
        //            }
        //            cipherText = Encoding.Unicode.GetString(ms.ToArray());
        //        }
        //    }
        //    return cipherText;
        //}

    }
    public class SuccesfulResult
    {
        public bool result { get; set; }
    }
}
