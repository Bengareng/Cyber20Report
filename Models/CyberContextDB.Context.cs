﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Cyber20Report.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class Cyber20CyberAnalyzerDBEntities : DbContext
    {
        public Cyber20CyberAnalyzerDBEntities()
            : base("name=Cyber20CyberAnalyzerDBEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
    
        public virtual ObjectResult<GetAllCyberAnalyzer_Result> GetAllCyberAnalyzer()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetAllCyberAnalyzer_Result>("GetAllCyberAnalyzer");
        }
    }
}