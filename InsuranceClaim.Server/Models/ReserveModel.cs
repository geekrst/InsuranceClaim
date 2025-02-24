namespace InsuranceClaim.Server.Models
{
    public class ReserveModel
    {
        public Guid Id { get; set; }
        public long ReserveDamage { get; set; }
        public long ReserveClaimantCost { get; set; }
        public long ReserveDefenceCost { get; set; }
        public long PaidDamage { get; set; }
        public long PaidClaimantCost { get; set; }
        public long PaidDefenceCost { get; set; }
        public long IncurredDamage { get; set; }
        public long IncurredClaimantCost { get; set; }
        public long IncurredDefenceCost { get; set; }

        public Boolean IsInApproval { get; set; }
        public string Status { get; set; }
        public DateTime StatusDate { get; set; }
        public Boolean IsOverRidden { get; set; }


    }
}
