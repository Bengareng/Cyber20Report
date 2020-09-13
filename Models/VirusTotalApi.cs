using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using VirusTotalNet;
using VirusTotalNet.Results;

namespace Cyber20Report.Models
{
    public class VirusTotalApi
    {
        readonly string api = "85ca525fbb8d2efeca799fe3f7309bc2c75e96e0271ae4128ba94c2382e416ce";


        async System.Threading.Tasks.Task GetReportsAsync() {
            VirusTotal virusTotal = new VirusTotal(api)
            {
                UseTLS = true
            };

            //Create the EICAR test virus. See http://www.eicar.org/86-0-Intended-use.html
            byte[] eicar = Encoding.ASCII.GetBytes(@"X5O!P%@AP[4\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*");

            //Check if the file has been scanned before.
            FileReport report = await virusTotal.GetFileReportAsync(eicar);
        }
    }
}