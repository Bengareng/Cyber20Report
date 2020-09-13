using Cyber20Report.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Cyber20Report.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            Cyber20CyberAnalyzerDBEntities cyber20CyberAnalyzerDB = new Cyber20CyberAnalyzerDBEntities();
            var ss = cyber20CyberAnalyzerDB.GetAllCyberAnalyzer().ToArray();
            return View(ss);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpGet]
        public ActionResult GetAllCyberReports(int index, int totalrow)
        {
            Cyber20CyberAnalyzerDBEntities cyber20CyberAnalyzerDB = new Cyber20CyberAnalyzerDBEntities();


            int rows = 500;
            bool flag = false;
            int ssds;
            //var reports = cyber20CyberAnalyzerDB.GetAllCyberAnalyzer(index, rows);

            //int length = reports.FirstOrDefault().RowTotal.Value;

            //if ((length / 500) * 500 < length)
            //{
            //    ssds = (length / 500) + 1;
            //    flag = true;
            //}
            //else ssds = (length / 500);




            //List<GetAllCyberAnalyzer_Result1> ss = new List<GetAllCyberAnalyzer_Result1>();

            //for (int i = 0; i < ssds; i++)
            //{
            //    if (ssds - 1 == i && flag)
            //    {
            //        rows = length - (length / rows) * rows;
            //    }

            //    foreach (var item in reports)
            //    {
            //        ss.Add(item);
            //    }
            //}

            var jsonResult = Json("", JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }


    }
}