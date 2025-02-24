namespace InsuranceClaim.Server.Models
{
    public class PaymentModel
    {
        public Guid Id { get; set; }
        public long PaymentDamage { get; set; }
        public long PaymentClaimantCost { get; set; }
        public long PaymentDefenceCost { get; set; }
        public string Status { get; set; }

        public Boolean IsInApproval { get; set; }

        public string PaymentType { get; set; }

        public DateTime StatusDate { get; set; }
    }
}
