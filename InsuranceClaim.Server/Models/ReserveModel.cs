namespace InsuranceClaim.Server.Models
{
    public class ReserveModel
    {
        public int Id { get; set; }
        public double ReserveDamage { get; set; }
        public double ReserveClaimantCost { get; set; }
        public double ReserveDefenceCost { get; set; }
        public double PaidDamage { get; set; }
        public double PaidClaimantCost { get; set; }
        public double PaidDefenceCost { get; set; }
        public double IncurredDamage { get; set; }
        public double IncurredClaimantCost { get; set; }
        public double IncurredDefenceCost { get; set; }

        public Boolean IsInApproval { get; set; }
        public string Status { get; set; }
        public DateTime StatusDate { get; set; }
        public Boolean IsOverRidden { get; set; }

        //public ReserveModel() { }

    }

    public class AddReserveRequest
    {
        public int Id { get; set; }
        public double ReserveDamage { get; set; }
        public double ReserveClaimantCost { get; set; }
        public double ReserveDefenceCost { get; set; }

    }

}
